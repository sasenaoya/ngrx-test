import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MessageBoxButtons, MessageBoxService } from 'src/app/message-box.service';
import { IComment, IPdf } from '../../pdf.model';
import { PdfService } from '../../pdf.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnChanges {
  /** 表示しているPDF */
  @Input() pdf?: IPdf;

  /** 表示しているページ */
  @Input() page?: number;

  /** コメント一覧 */
  @Input() comments?: IComment[];

  /** 選択中のコメント */
  @Input() selectedComment?: IComment;
  @Output() selectedCommentChange = new EventEmitter<IComment>();

  /** コメントの削除イベント */
  @Output() commentRemoved = new EventEmitter<IComment>();

  /** パネルに表示するコメント一覧 */
  filteredComments?: IComment[];

  constructor(private messageBoxService: MessageBoxService, private pdfService: PdfService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pdf'] || changes['page'] || changes['comments']) {
      this.getComments();
    }
  }

  /**
   * コメントの削除ボタンがクリックされた
   */
  onRemove(comment: IComment) {
    if (this.pdf?._id && comment._id) {
      const pdfId = this.pdf?._id;
      const commentId = comment._id;
      this.messageBoxService.open({ message: 'コメントを削除します。', buttons: [MessageBoxButtons.Cancel, MessageBoxButtons.Ok] }).afterClosed().subscribe(res => {
        if (res === MessageBoxButtons.Ok) {
          this.pdfService.removeComment(pdfId, commentId).subscribe(() => this.commentRemoved.emit(comment));
        }
      });
    }
  }

  /**
   * コメントがクリックされた
   * クリックされたコメントを選択状態にする
   */
  onCommentClick(comment: IComment) {
    this.selectedCommentChange.emit(comment);
  }

  /** すべてのコメントから表示するコメントだけを取得する */
  private getComments() {
    this.filteredComments = this.comments?.filter(comment => comment.page === this.page);
  }
}
