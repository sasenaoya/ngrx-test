import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, map, switchMap, mergeMap } from 'rxjs';
import { commentsActions, pdfActions } from './pdf.action';
 
@Injectable()
export class PdfEffects {
    setPdf$ = createEffect(() => this.actions$.pipe(
        ofType(pdfActions.setPdf),
        switchMap(({pdf}) => of(commentsActions.setComments({comments: pdf?.comments? pdf.comments : []}))),
    ));

    constructor(
        private actions$: Actions,
    ) {}
}