import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-pdf-upload',
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.scss']
})
export class PdfUploadComponent {
  formGroup: FormGroup;
  file?: File;

  constructor(fb: FormBuilder, private router: Router, private pdfService: PdfService) {
    this.formGroup = fb.group({
      file: ['', Validators.required],
    });
  }

  onFileChange(e: any) {
    if (e.target.files.length > 0) {
      this.file = e.target.files[0];
    }
  }

  onSubmit() {
    if (this.file) {
      this.pdfService.uploadPdf(this.file).subscribe(() => this.router.navigate(['/pdf/list']));
    }
  }
}
