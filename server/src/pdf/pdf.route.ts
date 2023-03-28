import express, { Request, Response } from 'express';
export const router = express.Router();

import * as pdf from './pdf.service';

/** PDFの一覧を取得 */
router.get('/list', (req: Request, res: Response) => pdf.getPdfList(req, res));

/** 新規にPDFをアップロードする */
router.post('/upload', (req: Request, res: Response) => pdf.uploadPdf(req, res));

/** 指定ページの画像を取得 */
router.get('/image/:id', (req: Request, res: Response) => pdf.getImage(req, res));

/** PDFの情報を取得 */
router.get('/:id', (req: Request, res: Response) => pdf.getPdf(req, res));
