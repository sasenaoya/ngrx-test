import express from 'express';
import { router as pdfRouter } from './pdf/pdf.route';

export const router = express.Router();

router.use('/pdf', pdfRouter);
