import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-after-confirm-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule
  ],
  templateUrl: './after-confirm-modal.component.html',
  styleUrl: './after-confirm-modal.component.scss'
})
export class AfterConfirmModalComponent implements OnInit{
  title = ''
  constructor(private dialogRef: MatDialogRef<AfterConfirmModalComponent>, @Inject(MAT_DIALOG_DATA) private data: {
    title: string;
  }) {
  }

  ngOnInit(): void {
    this.title = this.data.title
  }

  close(): void {
    this.dialogRef.close()
  }
}
