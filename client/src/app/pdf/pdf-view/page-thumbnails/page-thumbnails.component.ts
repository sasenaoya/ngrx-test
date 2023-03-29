import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subject, take, takeUntil, timer } from 'rxjs';
import { IPdf } from '../../pdf.model';
import { PdfFacade } from '../../pdf.facade';
import { PdfService } from '../../pdf.service';

@Component({
  selector: 'app-page-thumbnails',
  templateUrl: './page-thumbnails.component.html',
  styleUrls: ['./page-thumbnails.component.scss']
})
export class PageThumbnailsComponent implements  OnInit, OnDestroy, OnChanges {
  /** 表示するPDF */
  @Input() pdf?: IPdf;

  /** 現在選択されているページ */
  @Input() page?: number;

  /** サムネイル画像の一覧 */
  imageUrls = new Array<SafeUrl | undefined>();

  destroySubject$ = new Subject<void>();

  // コンストラクタ
  constructor(private sanitizer: DomSanitizer, private pdfService: PdfService, private pdfFacade: PdfFacade) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.destroySubject$.next();
      this.destroySubject$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pdf']) {
      this.getThumbnails();
    }
  }

  /**
   * サムネイル画像がクリックされた
   * 表示するページを変更する
   */
  onImageClick(i: number) {
    this.pdfFacade.setCurrentPageNumber(i);
  }

  /**
   * すべてのページのサムネイル画像を取得する
   */
  private getThumbnails() {
    if (this.pdf?._id && this.pdf?.images?.length) {
      this.imageUrls = new Array(this.pdf.images.length);
      const imageIds = this.pdf.images.map(i => i._id!);

      // 一気に取得するとデバッグ環境だとすべて取得するまで何もできなくなるので、タイマーを挟む
      timer(1, 10).pipe(take(this.pdf.images.length), takeUntil(this.destroySubject$)).subscribe(i => {
        this.pdfService.getThumbnail(imageIds[i]).subscribe({
          next: blob => {
            this.imageUrls[i] = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
          },
          error: () => {
            this.imageUrls[i] = undefined;
          },
        });
      });
    } else {
      this.imageUrls = [];
    }
  }
}
