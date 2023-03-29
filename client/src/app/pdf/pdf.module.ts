import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PdfRoutingModule } from './pdf-routing.module';
import { PdfListComponent } from './pdf-list/pdf-list.component';
import { PdfUploadComponent } from './pdf-upload/pdf-upload.component';
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { CommentListComponent } from './pdf-view/comment-list/comment-list.component';
import { PageThumbnailsComponent } from './pdf-view/page-thumbnails/page-thumbnails.component';
import { ImageViewComponent } from './pdf-view/image-view/image-view.component';
import { AddCommentDialogComponent } from './pdf-view/add-comment-dialog/add-comment-dialog.component';
import { pdfReducer } from './state/pdf.reducer';
import { commentsReducer } from './state/comments.reducer';
import { PdfEffects } from './state/pdf.effects';
import { CommentsEffects } from './state/comments.effects';

@NgModule({
  declarations: [
    PdfListComponent,
    PdfUploadComponent,
    PdfViewComponent,
    CommentListComponent,
    PageThumbnailsComponent,
    ImageViewComponent,
    AddCommentDialogComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    PdfRoutingModule,

    StoreModule.forRoot({
      pdf: pdfReducer,
      comments: commentsReducer,
    }),
    EffectsModule.forRoot([PdfEffects, CommentsEffects]),
  ]
})
export class PdfModule { }
