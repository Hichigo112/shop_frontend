import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {defaultBrands} from "../../../../constants/brand.constant";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-product-modal-form',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ProductModalFormComponent implements OnInit{

  form!: FormGroup;
  title:string;
  allBrands = defaultBrands

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: {
      title: string,
    }) {

    this.title = data.title;

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      name_from_1c: ['', [Validators.required]],
      price: ['', [Validators.required]],
      volume: ['', [Validators.required]],
      description: ['', [Validators.required]],
      brand: ['', [Validators.required]],
    });
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
