import { createReducer, on } from '@ngrx/store';
import { IPdf } from '../pdf.model';
import { pdfActions } from './pdf.action';

export interface PdfState {
    pdf?: IPdf;
    currentPageNumber?: number;
}

export const initialState: PdfState = {};

export const pdfReducer = createReducer(
    initialState,
    on(pdfActions.setPdf, (state, { pdf }) => ({ pdf, currentPageNumber: pdf ? 0 : undefined })),
    on(pdfActions.setCurrentPageNumber, (state, { pageNumber }) => ({ ...state, currentPageNumber: pageNumber })),
);