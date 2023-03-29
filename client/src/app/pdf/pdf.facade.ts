import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPdf, IComment } from './pdf.model';
import { commentsActions, setSelectedComment, setPageNumber, setPdf } from './state/pdf.action';
import { selectComments, selectSelectedComment, selectPageNumber, selectPdf } from './state/pdf.selectors';

@Injectable({
  providedIn: 'root'
})
export class PdfFacade {
  constructor(private store: Store) { }

  pdf$ = this.store.select(selectPdf);
  currentPageNumber$ = this.store.select(selectPageNumber);
  comments$ = this.store.select(selectComments);
  selectedComment$ = this.store.select(selectSelectedComment);

  setPdf(pdf: IPdf) {
    this.store.dispatch( setPdf({pdf}) );
    this.setPageNumber(0);
    this.setComments(pdf.comments ? pdf.comments : []);
  }

  setPageNumber(pageNumber: number) {
    this.store.dispatch(setPageNumber({pageNumber}));
  }

  setComments(comments: IComment[]) {
    this.store.dispatch( commentsActions.setComments({comments}) );
    this.setSelectedComment({});
  }

  addComment(comment: IComment) {
    this.store.dispatch( commentsActions.addComment({comment}) );
  }

  removeComment(commentId: string) {
    this.store.dispatch( commentsActions.removeComment({commentId}) );
  }

  setSelectedComment(comment: IComment) {
    this.store.dispatch( setSelectedComment({comment}) );
  }
}
