import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { AddCommentDialogComponent } from '../add-comment-dialog/add-comment-dialog.component';
import { IComment, IPdf } from '../../pdf.model';
import { PdfService } from '../../pdf.service';
import { PdfFacade } from '../../pdf.facade';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnDestroy, OnChanges {
  @ViewChild('image') imageElem?: ElementRef;

  /** 表示するPDF */
  @Input() pdf?: IPdf;

  /** 表示するページ */
  @Input() page?: number;

  /** コメント一覧 */
  @Input() comments: IComment[] = [];

  /** 選択中のコメント */
  @Input() selectedComment?: IComment;

  /** ページ変更時に毎回画像をロードすると遅いので、一度取得した画像はそのまま保持しておく */
  imageUrls: SafeUrl[] = [];

  /** 表示するコメント */
  filteredComments: IComment[] = [];

  destroySubject$ = new Subject<void>();

  constructor(private sanitizer: DomSanitizer, private dialog: MatDialog, private pdfService: PdfService, private pdfFacade: PdfFacade) {}

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pdf']) {
      this.imageUrls = this.pdf?.images?.length ? new Array(this.pdf.images.length) : [];
    }

    if (changes['pdf'] || changes['page']) {
      this.getImage();
    }

    if (changes['pdf'] || changes['page'] || changes['comments']) {
      this.getComments();
    }
  }

  /**
 * 画像がクリックされた
 * コメント作成のダイアログを表示し、クリック位置にコメントを追加する
 */
  onImageClick(e: MouseEvent) {
    if (this.pdf?._id && this.page !== undefined && this.imageElem) {
      const id = this.pdf._id;
      const r = this.imageElem.nativeElement.getBoundingClientRect();
      const page = this.page;

      const dialogRef = this.dialog.open(AddCommentDialogComponent, { data: undefined });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const x = e.clientX - r.x;
          const y = e.clientY - r.y;
          this.pdfService.addComment(id, result, page, x, y, 100, 100).subscribe(res => this.pdfFacade.addComment(res));
        }
      });
    }
  }

  /**
   * 作成済みの指摘をクリックした
   * クリックされた指摘を選択状態にする
   */
  onNoteClick(comment: IComment) {
    this.pdfFacade.setSelectedComment(comment);
  }

  /** プレビュー画像を取得する */
  private getImage() {
    if (this.pdf?._id && this.page !== undefined && this.pdf.images) {
      const page = this.page;

      // まだこのページの画像を取得していない場合、取得しにいく
      if (this.imageUrls[page] === undefined) {
        this.pdfService.getImage(<string>this.pdf.images[page]._id).pipe(takeUntil(this.destroySubject$)).subscribe(blob => {
          if (this.imageUrls) {
            this.imageUrls[page] = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
          }
        });
      }
    }
  }

  /** すべてのコメントから表示するコメントだけ取得する */
  private getComments() {
    this.filteredComments = this.comments.filter(comment => comment.page === this.page);
  }
}
