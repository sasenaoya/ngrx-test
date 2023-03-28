import { Request, Response } from 'express';
import { Pdf } from './pdf.model';

// PDFアップロード先
const pdfDir = process.env.PDF_DIR || '/home/node/pdf';

function error(res: Response, ex: any) {
    console.log(ex);
    res.sendStatus(500);
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
