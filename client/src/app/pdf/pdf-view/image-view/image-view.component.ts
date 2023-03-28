import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { IComment, IPdf } from '../../pdf.model';
import { PdfService } from '../../pdf.service';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnDestroy, OnChanges {
  @ViewChild('image') imageElem?: ElementRef;

  /** 表示するPDF */
  @Input() pdf?: IPdf;

  /** コメント一覧 */
  @Input() comments?: IComment[];

  /** 表示するページ */
  @Input() page?: number;

  /** 選択中のコメント */
  @Input() selectedComment?: IComment;
  @Output() selectedCommentChange = new EventEmitter<IComment>();

  /** コメントが追加された時のイベント */
  @Output() commentAdded = new EventEmitter<IComment>();

  /** ページ変更時に毎回画像をロードすると遅いので、一度取得した画像はそのまま保持しておく */
  imageUrls?: SafeUrl[];

  /** 表示するコメント */
  filteredComments?: IComment[];

  destroySubject$ = new Subject<void>();

  constructor(private sanitizer: DomSanitizer, private pdfService: PdfService) {}

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pdf']) {
      this.imageUrls = Array.isArray(this.pdf?.images) ? new Array(this.pdf?.images.length) : undefined;
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
  }

  /**
   * 作成済みの指摘をクリックした
   * クリックされた指摘を選択状態にする
   */
  onNoteClick(comment: IComment) {
    this.selectedCommentChange.emit(comment);
  }

  /** プレビュー画像を取得する */
  private getImage() {
    if (this.pdf?._id && this.page !== undefined && this.pdf.images) {
      const page = this.page;

      // まだこのページの画像を取得していない場合、取得しにいく
      if (this.imageUrls && this.imageUrls[page] === undefined) {
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
    this.filteredComments = undefined;
    if (this.pdf?._id && this.page !== undefined) {
      if (Array.isArray(this.pdf?.comments)) {
        this.filteredComments = this.pdf.comments.filter(comment => comment.page === this.page);
      }
    }
  }
}
