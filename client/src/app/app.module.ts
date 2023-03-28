import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PdfModule } from './pdf/pdf.module';
import { MessageBoxDialogComponent } from './message-box-dialog/message-box-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageBoxDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,
    PdfModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
