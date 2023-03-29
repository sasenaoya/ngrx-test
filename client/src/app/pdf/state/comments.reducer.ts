import { createReducer, on } from '@ngrx/store';
import { IComment } from '../pdf.model';
import { commentsActions } from './pdf.action';

export const initialState: IComment[] = [];

export const commentsReducer = createReducer(
    initialState,
    on(commentsActions.setComments, (state, { comments }) => [...comments]),
    on(commentsActions.addComment, (state, { comment }) => [...state, comment]),
    on(commentsActions.removeComment, (state, { commentId }) => state.filter(c => c._id !== commentId)),
);
