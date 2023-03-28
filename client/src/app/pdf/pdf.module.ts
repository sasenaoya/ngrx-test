import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PdfRoutingModule } from './pdf-routing.module';
import { PdfListComponent } from './pdf-list/pdf-list.component';
import { PdfUploadComponent } from './pdf-upload/pdf-upload.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PdfListComponent,
    PdfUploadComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    PdfRoutingModule,
  ]
})
export class PdfModule { }
