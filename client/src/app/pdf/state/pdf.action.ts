import { createAction, createActionGroup, props } from '@ngrx/store';
import { IComment, IPdf } from '../pdf.model';

export const pdfActions = createActionGroup({
    source: 'pdf',
    events: {
        'Set Pdf': props<{pdf?: IPdf}>(),
        'Set Current Page Number': props<{pageNumber?: number}>(),
    },
});

export const commentsActions = createActionGroup({
    source: 'Comments',
    events: {
        'Set Comments': props<{comments: IComment[]}>(),
        'Add Comment': props<{comment: IComment}>(),
        'Remove Comment': props<{commentId: string}>(),
        'Select Comment': props<{comment?: IComment}>(),
    },
});
