import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PdfListComponent } from "./pdf-list/pdf-list.component";
import { PdfUploadComponent } from "./pdf-upload/pdf-upload.component";

const routes: Routes = [
    {
        path: 'pdf',
        children: [
            { path: 'list', component: PdfListComponent },
            { path: 'upload', component: PdfUploadComponent },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PdfRoutingModule { }
