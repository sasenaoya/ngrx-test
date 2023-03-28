import { Component } from '@angular/core';
import { IPdf, Status } from '../pdf.model';
import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-pdf-list',
  templateUrl: './pdf-list.component.html',
  styleUrls: ['./pdf-list.component.scss']
})
export class PdfListComponent {
  displayColumns = ['name', 'status', 'pageNum', 'createdDate', 'modifiedDate'];
  pdfs: IPdf[] = [];

  constructor(private pdfService: PdfService) {
    this.refresh();
  }

  getStatus(status?: string) {
    switch (status) {
      case Status.unprocessed:
        return '未処理';
      case Status.processing:
        return '処理中';
      case Status.success:
        return '成功';
      case Status.failure:
        return '失敗';
      default:
        return '不明';
    }
  }

  refresh() {
    this.pdfService.getList().subscribe(res => this.pdfs = res);
  }
}
