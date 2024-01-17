import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {PromocodeDto} from "../../../../dto/promocode.dto";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {Subject, takeUntil} from "rxjs";
import {PromocodeService} from "../../services/promocode.service";

@Component({
  selector: 'app-promocode-modal-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    NgForOf
  ],
  templateUrl: './promocode-modal-form.component.html',
  styleUrl: './promocode-modal-form.component.scss'
})
export class PromocodeModalFormComponent implements OnInit, OnDestroy{

  title = ''
  form!: FormGroup
  active = [{
    is_active: 'Активный',
    result: true,
  }, {
    is_active: 'Приостановлен',
    result: false
  }]
  isCreate = true

  defaultSnackBarValue: MatSnackBarConfig = {
    horizontalPosition: "end",
    verticalPosition: "bottom",
    duration: 3000
  }

  destroy$ = new Subject<boolean>()

  constructor(private dialogRef: MatDialogRef<PromocodeModalFormComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {title: string;} & PromocodeDto,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private promocodeService: PromocodeService
              ) {
  }
  ngOnInit(): void {
    this.title = this.data.title
    this.form = this.fb.group({
      code: [this.data.code, Validators.required],
      discount: [this.data.discount, Validators.required],
      type: [this.data.type, Validators.required],
      is_active: [this.data.is_active, Validators.required]
    })
    this.data.id ? this.isCreate = false : this.isCreate = true
  }



  save() {
    if (this.form.valid) {
      const code: Omit<PromocodeDto, 'id'> = {
        code: this.form.get('code')?.value,
        discount: this.form.get('discount')?.value,
        type: this.form.get('type')?.value,
        is_active: this.form.get('is_active')?.value,
      }
      this._snackBar.open('Отправили изменения на сервер', '', this.defaultSnackBarValue)
      if (this.isCreate) {
        this.promocodeService.createPromocode(code).pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => {
          this._snackBar.open('Новый промокод добавлен', '', this.defaultSnackBarValue)
          this.dialogRef.close(true)
        })
      } else {
        this.promocodeService.updatePromocode(code, this.data.id).pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => {
          this._snackBar.open('Промокод обновлён', '', this.defaultSnackBarValue)
          this.dialogRef.close(true)
        })
      }
    }
  }

  close() {
    this.dialogRef.close(false)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
