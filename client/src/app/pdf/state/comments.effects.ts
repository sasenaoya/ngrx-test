import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, EMPTY, of } from "rxjs";
import { PdfService } from "../pdf.service";
import { commentsActions } from "./pdf.action";

@Injectable()
export class CommentsEffects {
    addComment$ = createEffect(() => this.actions$.pipe(
        ofType(commentsActions.addComment),
        switchMap(({pdfId, comment}) => this.pdfService.addComment(pdfId, comment).pipe(
            map(comment => commentsActions.addCommentSuccess({comment})),
            catchError(() => EMPTY)
        )),
    ));

    removeComment$ = createEffect(() => this.actions$.pipe(
        ofType(commentsActions.removeComment),
        switchMap(({pdfId, commentId}) => this.pdfService.removeComment(pdfId, commentId).pipe(
            map(() => commentsActions.removeCommentSuccess({commentId})),
            catchError(() => EMPTY)
        )),
    ));

    constructor(
        private actions$: Actions,
        private pdfService: PdfService,
    ) {}
}