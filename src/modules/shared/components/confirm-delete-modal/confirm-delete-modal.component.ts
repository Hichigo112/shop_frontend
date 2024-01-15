import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogTitle
  ],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.scss'
})
export class ConfirmDeleteModalComponent implements OnInit{
  text = ''
  confirmText = ''
  cancelText = ''
  constructor(@Inject(MAT_DIALOG_DATA) private data: {
    text: string;
    confirmText: string;
    cancelText: string;
  }, private dialogRef: MatDialogRef<ConfirmDeleteModalComponent>) {
  }

  ngOnInit(): void {
    this.text = this.data.text
    this.confirmText = this.data.confirmText
    this.cancelText = this.data.cancelText
  }

  confirm() {
    this.dialogRef.close(true)
  }

  cancel() {
    this.dialogRef.close(false)
  }
}
