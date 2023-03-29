import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CommentsState } from './comments.reducer';
import { PdfState } from './pdf.reducer';

const selectPdfState = createFeatureSelector<PdfState>('pdf');
export const selectPdf = createSelector(selectPdfState, state => state.pdf);
export const selectCurrentPageNumber = createSelector(selectPdfState, state => state.currentPageNumber);

const selectCommentsState = createFeatureSelector<CommentsState>('comments');
export const selectComments = createSelector(selectCommentsState, state => state.comments);
export const selectSelectedComment = createSelector(selectCommentsState, state => state.selectedComment);
