import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, of, catchError, EMPTY } from "rxjs";
import { PdfService } from "../pdf.service";
import { commentsActions, pdfActions } from "./pdf.action";

@Injectable()
export class PdfEffects {
    loadPdf$ = createEffect(() => this.actions$.pipe(
        ofType(pdfActions.load),
        switchMap(({id}) => this.pdfService.getPdf(id).pipe(
            map(pdf => pdfActions.setPdf({pdf})),
            catchError(() => EMPTY)
        )),
    ));

    setPdf$ = createEffect(() => this.actions$.pipe(
        ofType(pdfActions.setPdf),
        switchMap(({pdf}) => of(commentsActions.setComments({comments: pdf?.comments ? pdf.comments : []}))),
    ));

    constructor(
        private actions$: Actions,
        private pdfService: PdfService,
    ) {}
}