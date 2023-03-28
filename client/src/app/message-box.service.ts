import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxDialogComponent } from './message-box-dialog/message-box-dialog.component';

export interface MessageBoxOptions {
  title?: string;
  message: string;
  buttons: MessageBoxButton[];
}

export interface MessageBoxButton {
  text: string;
  initial?: boolean;
}

const OkButton: MessageBoxButton = { text: 'OK', initial: true };
const CancelButton: MessageBoxButton = { text: 'Cancel' };

export const MessageBoxButtons = {
  Ok: OkButton,
  Cancel: CancelButton,
};

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {
  constructor(private dialog: MatDialog) {}

  open(options?: MessageBoxOptions) {
    return this.dialog.open(MessageBoxDialogComponent, { data: options });
  }
}
