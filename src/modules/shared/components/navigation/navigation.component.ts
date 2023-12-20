import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  router = inject(Router)
  authService = inject(AuthService)
  logout() {
    this.authService.logoutToken().subscribe(res => {
      localStorage.clear()
      this.router.navigate(['/auth/login'])
    })
  }
}
