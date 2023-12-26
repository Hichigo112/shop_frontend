import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {AuthService} from "../modules/auth/services/auth.service";
import {Subscription} from "rxjs";
import {ModalComponent} from "../modules/shared/components/modal/modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'shop_frontend';
  subscription = new Subscription()

  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.subscription = this.authService.getUserInfo().subscribe(res => {
      this.authService.setUserInfo(res)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
