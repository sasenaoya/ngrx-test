import { createReducer, on } from '@ngrx/store';
import { IComment } from '../pdf.model';
import { commentsActions } from './pdf.action';

export interface CommentsState {
    comments: IComment[];
    selectedComment?: IComment;
}

export const initialState: CommentsState = {
    comments: [],
};

export const commentsReducer = createReducer(
    initialState,
    on(commentsActions.setComments, (state, { comments }) => ({ ...state, comments })),
    on(commentsActions.addComment, (state, { comment }) => ({ comments: [...state.comments, comment], selectedComment: comment })),
    on(commentsActions.removeComment, (state, { commentId }) => ({
        comments: state.comments.filter(c => c._id !== commentId),
        selectedComment: state.selectedComment?._id === commentId ? undefined : state.selectedComment,
    })),
    on(commentsActions.selectComment, (state, { comment }) => ({ ...state, selectedComment: comment })),
);
