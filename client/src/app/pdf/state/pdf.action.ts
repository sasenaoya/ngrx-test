import { createAction, createActionGroup, props } from '@ngrx/store';
import { IComment, IPdf } from '../pdf.model';

export const pdfActions = createActionGroup({
    source: 'pdf',
    events: {
        'Load': props<{id: string}>(),
        'Set Pdf': props<{pdf?: IPdf}>(),
        'Set Current Page Number': props<{pageNumber?: number}>(),
    },
});

export const commentsActions = createActionGroup({
    source: 'Comments',
    events: {
        'Set Comments': props<{comments: IComment[]}>(),
        'Add Comment': props<{pdfId: string, comment: IComment}>(),
        'Add Comment Success': props<{comment: IComment}>(),
        'Remove Comment': props<{pdfId: string, commentId: string}>(),
        'Remove Comment Success': props<{commentId: string}>(),
        'Select Comment': props<{comment?: IComment}>(),
    },
});
