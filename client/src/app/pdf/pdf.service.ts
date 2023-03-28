import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPdf } from './pdf.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  url = '/api/pdf';

  constructor(private http: HttpClient) { }

  /** PDF一覧を取得 */
  getList() {
    return this.http.get<IPdf[]>(`${this.url}/list`).pipe(map(res => this.convertServerToClientArray(res)));
  }

  /** PDFの詳細情報取得 */
  getPdf(id: string) {
    return this.http.get<IPdf>(`${this.url}/${id}`).pipe(map(res => this.convertServerToClient(res)));
  }

  /** PDFのアップロード */
  uploadPdf(file: File) {
    const formData = new FormData();
    formData.set('file', file, file.name);
    return this.http.post(`${this.url}/upload`, formData);
  }

  getImage(id: string) {
    return this.http.get(`${this.url}/image/${id}`, { responseType: 'blob' });
  }

  private convertServerToClientArray(pdfs: IPdf[]) {
    for (const pdf of pdfs) {
      this.convertServerToClient(pdf);
    }
    return pdfs;
  }

  private convertServerToClient(pdf: IPdf) {
    if (typeof pdf.createdDate === 'string') {
      pdf.createdDate = new Date(pdf.createdDate);
    }
    if (typeof pdf.modifiedDate === 'string') {
      pdf.modifiedDate = new Date(pdf.modifiedDate);
    }

    if (pdf.comments) {
      for (const comment of pdf.comments) {
        if (typeof comment.createdDate === 'string') {
          comment.createdDate = new Date(comment.createdDate);
        }
        if (typeof comment.modifiedDate === 'string') {
          comment.modifiedDate = new Date(comment.modifiedDate);
        }
      }
    }
    return pdf;
  }
}
