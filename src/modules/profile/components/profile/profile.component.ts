import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../users/services/user.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserTableDto} from "../../../../dto/user.dto";
import {catchError, of, Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy{

  destroy$ = new Subject<boolean>()

  userData: UserTableDto | null = null
  form!: FormGroup
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.getMyData().pipe(
      catchError(err => {
        if (err.status === 403) this.router.navigate(['auth/login'])
        return of(null)
      }),
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.userData = res
      this.resetForm()
    })
  }

  resetForm(): void {
    this.form = this.fb.group({
      username: [this.userData?.username || '', Validators.required],
      email: [this.userData?.email || '', Validators.email],
      phone: [this.userData?.phone || ''],
    }, {updateOn: "blur"})
  }

  get confirmPassword() {
    return this.form.get('confirmPassword')
  }

  get username() {
    return this.form.get('username')
  }

  get email() {
    return this.form.get('email')
  }

  get phone() {
    return this.form.get('phone')
  }


  sendChanges(): void {
    if (this.form.valid) {
      const data = {
        username: this.username?.value || '',
        email: this.email?.value || '',
        phone: this.phone?.value || ''
      }
      this.userService.patchInfo(data).pipe(
        catchError(err => {
          if (err.status === 400) {
            this.username?.setErrors({busy: true})
          }
          this._snackBar.open('Произошла ошибка, попробуйте позже', '', {horizontalPosition: "end",
            verticalPosition: "bottom",
            duration: 3000})
          return of(null)
        }),
        takeUntil(this.destroy$)
      ).subscribe(res=> {
        if (res) {
          this.userData = res
          this.resetForm()
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
