import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfFacade } from '../pdf.facade';
import { IComment, IPdf } from '../pdf.model';
import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent {
  pdf$ = this.pdfFacade.pdf$;
  currentPageNumber$ = this.pdfFacade.currentPageNumber$;
  comments$ = this.pdfFacade.comments$;
  selectedComment$ = this.pdfFacade.selectedComment$;

  constructor(route: ActivatedRoute, private pdfFacade: PdfFacade) {
    route.params.subscribe(params => {
      this.pdfFacade.loadPdf(params['id']);
    });
  }
}
