import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {LongUserDto} from "../../../../dto/user.dto";
import {HttpClientModule} from "@angular/common/http";
import {catchError,  of, Subject, takeUntil} from "rxjs";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{
  destroy$: Subject<boolean> = new Subject()
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  formData: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.maxLength(150), Validators.pattern('^[\\w.@+-]+$')]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {
    validators: this.passwordCheck.bind(this),
    updateOn: "change"
  })

  submit() {
    if (this.formData.valid) {
      const userData: LongUserDto = {
        username: this.userName?.value,
        password: this.password?.value,
      }
      this.authService.createUser(userData).pipe(
        catchError(err => {
          if (err.status === 400) {
            this.userName?.setErrors({username: true})
          }
          return of({} as LongUserDto)
        }),
        takeUntil(this.destroy$)
      ).subscribe(res => {
        if (res.id) {
          this.router.navigate(['auth/login'])
        }
      })
    }
  }

  get userName () {
    return this.formData.get('userName')
  }
  get password () {
    return this.formData.get('password')
  }
  get confirmPassword () {
    return this.formData.get('confirmPassword')
  }

  passwordCheck(formGroup: FormGroup): null | object {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }
}
