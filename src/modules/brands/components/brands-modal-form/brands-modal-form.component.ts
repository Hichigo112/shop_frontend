import {Component, Inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-brands-product-modal-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './brands-modal-form.component.html',
  styleUrl: './brands-modal-form.component.scss'
})
export class BrandsModalFormComponent implements OnInit{

  title = ''
  form!: FormGroup


  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<BrandsModalFormComponent>,
              @Inject(MAT_DIALOG_DATA) data: {
                title: string,
              }) {
    this.title = data.title
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    })
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
