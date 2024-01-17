import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../../auth/services/auth.service";
import {MatButtonModule} from "@angular/material/button";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, OnDestroy{
  router = inject(Router)
  authService = inject(AuthService)
  isAuthUser = false
  isAdmin: boolean | null = false

  destroy$ = new Subject<boolean>()
  logout(): void {
    this.authService.logoutToken().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      localStorage.clear()
      this.isAuthUser = false
      this.router.navigate(['/products'])
    })

    this.authService.isAdmin.next(null)
  }
  loginPage(): void {
    this.router.navigate(['/auth/login'])
  }

  ngOnInit(): void {
    this.isAuthUser = !!localStorage.getItem('token')
    this.authService.isAdmin.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => this.isAdmin = res)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
