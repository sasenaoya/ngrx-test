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
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { CommentListComponent } from './pdf-view/comment-list/comment-list.component';
import { PageThumbnailsComponent } from './pdf-view/page-thumbnails/page-thumbnails.component';
import { ImageViewComponent } from './pdf-view/image-view/image-view.component';

@NgModule({
  declarations: [
    PdfListComponent,
    PdfUploadComponent,
    PdfViewComponent,
    CommentListComponent,
    PageThumbnailsComponent,
    ImageViewComponent,
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
