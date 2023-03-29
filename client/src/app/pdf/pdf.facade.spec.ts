import { TestBed } from '@angular/core/testing';

import { PdfFacade } from './pdf.facade';

describe('PdfFacade', () => {
  let service: PdfFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
