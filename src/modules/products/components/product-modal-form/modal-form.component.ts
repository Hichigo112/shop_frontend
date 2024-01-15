import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
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
import {ProductsService} from "../../services/products.service";
import {Subject, takeUntil} from "rxjs";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

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
export class ProductModalFormComponent implements OnInit, OnDestroy{

  form!: FormGroup;
  title:string;
  allBrands = defaultBrands
  defaultSnackBarValue: MatSnackBarConfig = {
    horizontalPosition: "end",
    verticalPosition: "bottom",
    duration: 3000
  }
  destroy$ = new Subject<boolean>()

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      title: string,
    }, private productsService: ProductsService, private _snackBar: MatSnackBar) {

    this.title = this.data.title;

  }

  ngOnInit(): void {
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
      const productData = {
        ...this.form.value,
        is_ready: true,
        is_retail_allowed: true
      }
      this._snackBar.open('Отправили изменения на сервер', '', this.defaultSnackBarValue)
      this.productsService.createProduct(productData).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this._snackBar.open('Продукт добавлен', '', this.defaultSnackBarValue)
        this.dialogRef.close(true);
      })

    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

}
