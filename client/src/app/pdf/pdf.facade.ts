import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPdf, IComment } from './pdf.model';
import { commentsActions, pdfActions } from './state/pdf.action';
import { selectComments, selectSelectedComment, selectPdf, selectCurrentPageNumber } from './state/pdf.selectors';

@Injectable({
  providedIn: 'root'
})
export class PdfFacade {
  constructor(private store: Store) { }

  pdf$ = this.store.select(selectPdf);
  currentPageNumber$ = this.store.select(selectCurrentPageNumber);
  comments$ = this.store.select(selectComments);
  selectedComment$ = this.store.select(selectSelectedComment);

  setPdf(pdf?: IPdf) {
    this.store.dispatch( pdfActions.setPdf({pdf}) );
  }

  setCurrentPageNumber(pageNumber?: number) {
    this.store.dispatch(pdfActions.setCurrentPageNumber({pageNumber}));
  }

  setComments(comments: IComment[]) {
    this.store.dispatch( commentsActions.setComments({comments}) );
  }

  addComment(comment: IComment) {
    this.store.dispatch( commentsActions.addComment({comment}) );
  }

  removeComment(commentId: string) {
    this.store.dispatch( commentsActions.removeComment({commentId}) );
  }

  setSelectedComment(comment?: IComment) {
    this.store.dispatch( commentsActions.selectComment({comment}) );
  }
}
