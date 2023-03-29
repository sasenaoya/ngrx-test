import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPdf, IComment } from '../pdf.model';

export const selectPdf = createFeatureSelector<IPdf>('pdf');

export const selectPageNumber = createFeatureSelector<number>('pageNumber');

export const selectComments = createFeatureSelector<IComment[]>('comments');

export const selectSelectedComment = createFeatureSelector<IComment>('selectedComment');
