import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.scss']
})
export class AddCommentDialogComponent {
  formGroup: FormGroup;

  constructor(fb: FormBuilder, private dialogRef: MatDialogRef<AddCommentDialogComponent>) {
    this.formGroup = fb.group({
      comment: ['', Validators.required],
    });
  }
}
