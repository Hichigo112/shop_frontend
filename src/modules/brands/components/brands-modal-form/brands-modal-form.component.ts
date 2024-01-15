import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
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
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {BrandService} from "../../services/brand.service";
import {Subject, takeUntil} from "rxjs";

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
export class BrandsModalFormComponent implements OnInit, OnDestroy{

  title = ''
  form!: FormGroup
  defaultSnackBarValue: MatSnackBarConfig = {
    horizontalPosition: "end",
    verticalPosition: "bottom",
    duration: 3000
  }
  destroy$ = new Subject<boolean>()


  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<BrandsModalFormComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { title: string, id: string, name: string, icon: string},
              private _snackBar: MatSnackBar, private brandService: BrandService) {
    this.title = this.data.title
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data.name, Validators.required],
      icon: [this.data.icon, Validators.required]
    })
  }

  save() {
    if (this.form.valid) {
      this._snackBar.open('Отправили изменения на сервер', '', this.defaultSnackBarValue)
      const brand = {
        ...this.form.value,
        margin: 0
      }
      if (this.data.id) {
        this.brandService.updateBrand(brand, this.data.id).pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => {
          this._snackBar.open('Бренд обновлён', '', this.defaultSnackBarValue)
          this.dialogRef.close(true);
        })
      } else {
        this.brandService.createBrand(brand).pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => {
          this._snackBar.open('Бренд добавлен', '', this.defaultSnackBarValue)
          this.dialogRef.close(true);
        })
      }
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
