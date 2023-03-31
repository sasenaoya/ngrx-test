import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfFacade } from '../pdf.facade';
import { IComment, IPdf } from '../pdf.model';
import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements OnDestroy {
  pdf$ = this.pdfFacade.pdf$;
  currentPageNumber$ = this.pdfFacade.currentPageNumber$;
  comments$ = this.pdfFacade.comments$;
  selectedComment$ = this.pdfFacade.selectedComment$;

  constructor(route: ActivatedRoute, private pdfService: PdfService, private pdfFacade: PdfFacade) {
    route.params.subscribe(params => {
      this.pdfService.getPdf(params['id']).subscribe(pdf => {
        this.pdfFacade.setPdf(pdf);
      });
    });
  }

  ngOnDestroy(): void {
    this.pdfFacade.setPdf(undefined);
  }
}
