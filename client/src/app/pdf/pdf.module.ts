import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfRoutingModule } from './pdf-routing.module';
import { PdfListComponent } from './pdf-list/pdf-list.component';
import { PdfUploadComponent } from './pdf-upload/pdf-upload.component';

@NgModule({
  declarations: [
    PdfListComponent,
    PdfUploadComponent
  ],
  imports: [
    CommonModule,
    PdfRoutingModule,
  ]
})
export class PdfModule { }
