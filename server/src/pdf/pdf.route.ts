import express, { Request, Response } from 'express';
export const router = express.Router();

import * as pdf from './pdf.service';

/** PDFの一覧を取得 */
router.get('/list', (req: Request, res: Response) => pdf.getPdfList(req, res));

/** 新規にPDFをアップロードする */
router.post('/upload', (req: Request, res: Response) => pdf.uploadPdf(req, res));
