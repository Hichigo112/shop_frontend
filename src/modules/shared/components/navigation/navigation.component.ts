import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../../auth/services/auth.service";
import {MatButtonModule} from "@angular/material/button";

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
export class NavigationComponent implements OnInit{
  router = inject(Router)
  authService = inject(AuthService)
  isAuthUser = false
  logout(): void {
    this.authService.logoutToken().subscribe(res => {
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
  }
}
