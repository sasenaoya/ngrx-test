import { createReducer, on } from '@ngrx/store';
import { IComment } from '../pdf.model';
import { setSelectedComment } from './pdf.action';

export const initialState: IComment = {};

export const setSelectedCommentReducer = createReducer(
    initialState,
    on(setSelectedComment, (state, { comment }) => comment),
);