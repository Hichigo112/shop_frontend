import {Component, OnDestroy} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NgClass, NgIf} from "@angular/common";
import {catchError, of, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{

  destroy$: Subject<boolean> = new Subject<boolean>()
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  formData = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })
  submit(): void {
    if (this.formData.valid) {
      const userData = {
        password: this.password?.value || '',
        username: this.userName?.value || ''
      }
      this.authService.loginToken(userData).pipe(
        catchError(err => {
          if (err.status === 400) {
            this.password?.setErrors({wrong: true})
            this.userName?.setErrors({wrong: true})
          }
          return of({
            auth_token: ''
          })
        }),
        takeUntil(this.destroy$)
      ).subscribe(res => {
        if (res.auth_token) {
          localStorage.setItem('token', res.auth_token)
          this.router.navigate(['products'])
        }
      })
    }
  }

  get userName() {
    return this.formData.get('userName')
  }

  get password() {
    return this.formData.get('password')
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }

}
