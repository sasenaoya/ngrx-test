import { createAction, createActionGroup, props } from '@ngrx/store';
import { IComment, IPdf } from '../pdf.model';

export const setPdf = createAction('Set Pdf', props<{pdf: IPdf}>());

export const setPageNumber = createAction('Set Page Number', props<{pageNumber: number}>());

export const commentsActions = createActionGroup({
    source: 'Comments',
    events: {
        'Set Comments': props<{comments: IComment[]}>(),
        'Add Comment': props<{comment: IComment}>(),
        'Remove Comment': props<{commentId: string}>(),
    },
});
export const setSelectedComment = createAction('Set Selected Comment', props<{comment: IComment}>());
