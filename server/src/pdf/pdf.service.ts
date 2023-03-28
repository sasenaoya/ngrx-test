import * as fs from 'fs';
import { execSync, spawn } from 'child_process';
import { Request, Response } from 'express';
import {} from 'express-fileupload';
import { forkJoin, firstValueFrom } from 'rxjs';
import { IImage, Image, IPdf, Pdf, Status } from './pdf.model';

// PDFアップロード先
const pdfDir = process.env.PDF_DIR || '/home/node/pdf';

function error(res: Response, ex: any) {
    console.log(ex);
    res.sendStatus(500);
}

/** PDFの情報を取得 */
export async function getPdf(req: Request, res: Response) {
    try {
        const pdf = await Pdf.findById(req.params.id).select('+comments').populate('comments').populate('images');
        res.send(pdf);
    } catch (ex) {
        error(res, ex);
    }
}

/** PDFの一覧を取得 */
export async function getPdfList(req: Request, res: Response) {
    try {
        const pdfList = await Pdf.find({});
        res.send(pdfList);
    } catch (ex) {
        error(res, ex);
    }
}

/** PDFのアップロード */
export async function uploadPdf(req: Request, res: Response) {
    if (req.files && !Array.isArray(req.files.file)) {
        console.log(req.files);

        // PDFの情報を保存するためのモデルを作成
        const pdf = new Pdf();
        const outputPath = `${pdfDir}/${pdf._id}`;
        const pdfFullPath = `${outputPath}/${pdf._id}.pdf`;

        try {
            // DBに登録
            pdf.name = req.files.file.name;
            pdf.fullPath = pdfFullPath;
            pdf.status = Status.processing;
            pdf.createdDate = pdf.modifiedDate = new Date();
            await pdf.save();

            // APIとしては成功を返す
            res.send(pdf);
        } catch (ex) {
            error(res, ex);
            return;
        }

        // PDFを画像に変換する
        convertPdfToImage(req.files.file.tempFilePath, outputPath, pdf);
    } else {
        res.sendStatus(400);
    }
}

/** 画像を取得 */
export async function getImage(req: Request, res: Response) {
    try {
        const image = await Image.findById(req.params.id).select('fullPath');
        if (image) {
            res.download(image.fullPath);
        } else {
            res.sendStatus(404);
        }
    } catch (ex) {
        error(res, ex);
    }
}

/** サムネイルを取得 */
export async function getThumbnail(req: Request, res: Response) {
    try {
        const image = await Image.findById(req.params.id).select('thumbnailFullPath');
        if (image) {
            res.download(image.thumbnailFullPath);
        } else {
            res.sendStatus(404);
        }
    } catch (ex) {
        error(res, ex);
    }
}

/** PDFを画像に変換 */
async function convertPdfToImage(tempFilePath: string, outputPath: string, pdf: IPdf) {
    try {
        // PDFを保存先ディレクトリに移動
        await mkdir(outputPath);
        await rename(tempFilePath, pdf.fullPath);

        // PDFを画像に変換
        const res = await firstValueFrom(forkJoin([
            createImage(outputPath, pdf),
            createThumbnailImage(outputPath, pdf)
        ]));

        if (res[0] === 0 && res[1] === 0) {
            // 出力された画像の一覧をDBに登録
            const images = getImages(outputPath, pdf);
            fs.readdirSync(outputPath).filter(file => file.endsWith('.png')).sort((a, b) => a < b ? -1 : 1).forEach(file => {
                const list = file.split('.')[0].split('-');
                if (list.length === 3) {
                    const page = +list[2] - 1;
                    if (images[page] === undefined) {
                        images[page] = new Image();
                        images[page].pdf = pdf._id;
                    }
                    if (list[1] === 'normal') {
                        images[page].fullPath = `${outputPath}/${file}`;
                        const [w, h] = getImageSize(images[page].fullPath);
                        images[page].width = w;
                        images[page].height = h;
                    } else if (list[1] ===  'thumbnail') {
                        images[page].thumbnailFullPath = `${outputPath}/${file}`;
                    }
                }
            });

            images.forEach(async image => {
                await image.save();
            });
            pdf.images = images.map(i => i._id);
            console.log(`upload success: ${pdf._id}`);
            pdf.status = 'success';
            pdf.modifiedDate = new Date();
            await pdf.save();
        } else {
            throw `upload failure: ${pdf._id}, ${pdf.status}`;
        }
    } catch (ex) {
        console.log(ex, pdf._id);
        try {
            await Pdf.findByIdAndUpdate(pdf._id, {
                status: 'failure',
                modifiedDate: new Date(),
            });
        } catch (ex2) {
            console.log(ex2);
        }
    }
}

/** PDFの各ページを画像にする */
function createImage(outputPath: string, pdf: IPdf) {
    return new Promise(resolve => {
        const proc = spawn('pdftoppm', ['-png', pdf.fullPath, `${outputPath}/${pdf._id}-normal`]);
        proc.on('close', code => {
            console.log(`pdftoppm result: ${code}, ${pdf._id}`);
            resolve(code);
        });
    });
}

/** PDFから各ページのサムネール画像を作成 */
function createThumbnailImage(outputPath: string, pdf: IPdf) {
    return new Promise(resolve => {
        const proc = spawn('pdftoppm', ['-scale-to', '250', '-png', pdf.fullPath, `${outputPath}/${pdf._id}-thumbnail`]);
        proc.on('close', code => {
            console.log(`pdftoppm thumbnail result: ${code}, ${pdf._id}`);
            resolve(code);
        });
    });
}

/** 作成した画像を取得し、Image documentの配列として返す */
function getImages(outputPath: string, pdf: IPdf) {
    const images: IImage[] = [];
    fs.readdirSync(outputPath).filter(file => file.endsWith('.png')).sort((a, b) => a < b ? -1 : 1).forEach(file => {
        const list = file.split('.')[0].split('-');
        if (list.length === 3) {
            const page = +list[2] - 1;
            if (images[page] === undefined) {
                images[page] = new Image();
                images[page].pdf = pdf._id;
            }
            if (list[1] === 'normal') {
                images[page].fullPath = `${outputPath}/${file}`;
                const [w, h] = getImageSize(<string>images[page].fullPath);
                images[page].width = w;
                images[page].height = h;
            } else if (list[1] ===  'thumbnail') {
                images[page].thumbnailFullPath = `${outputPath}/${file}`;
            }
        }
    });
    return images;
}

/** 画像の解像度を取得する */
function getImageSize(filepath: string) {
    try {
        const result = execSync(`identify ${filepath}`, {encoding: 'utf8'});
        const resolution = result.split(' ')[2];
        const res = resolution.split('x').map(v => +v);
        return res;
    } catch (ex) {
        console.log(ex);
        return [undefined, undefined];
    }
}

/** ディレクトリの作成 */
function mkdir(path: string) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, err => {
            if (err) {
                reject(err);
            } else {
                resolve(undefined);
            }
        });
    });
}

/** ファイル名の変更・移動 */
function rename(oldPath: string, newPath: string) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, err => {
            if (err) {
                reject(err);
            } else {
                resolve(undefined);
            }
        });
    });
}
