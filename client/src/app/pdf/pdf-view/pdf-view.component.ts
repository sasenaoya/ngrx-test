import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment, IPdf } from '../pdf.model';
import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent {
  pdf?: IPdf;
  currentPageNumber = 0;
  selectedComment?: IComment;

  constructor(route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef, pdfService: PdfService) {
    route.params.subscribe(params => {
      pdfService.getPdf(params['id']).subscribe(pdf => {
        this.pdf = pdf;
      });
    });
  }
}
