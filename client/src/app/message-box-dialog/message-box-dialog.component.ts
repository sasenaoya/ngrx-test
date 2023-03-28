import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageBoxOptions } from '../message-box.service';

@Component({
  selector: 'app-message-box-dialog',
  templateUrl: './message-box-dialog.component.html',
  styleUrls: ['./message-box-dialog.component.scss']
})
export class MessageBoxDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public options: MessageBoxOptions) {}
}
