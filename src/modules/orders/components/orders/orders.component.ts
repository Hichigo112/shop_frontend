import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrdersService} from "../../services/orders.service";
import {Subject, takeUntil} from "rxjs";
import {OrderDto} from "../../../../dto/orders.dto";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {ToTextPipe} from "../../../shared/pipes/to-text.pipe";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    ToTextPipe,
    DatePipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit, OnDestroy{
  ordersData: OrderDto[] = []

  destroy$ = new Subject<boolean>()
  displayedColumns =  ['Номер заказа', 'Оплачено', 'Просмотрено администратором', 'Дата создания', 'Статус'];

  constructor(private ordersService: OrdersService, private router: Router) {
  }
  ngOnInit(): void {
    this.ordersService.allOrders$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.ordersData = res
    })
    if (!this.ordersData.length) this.updateData()
  }


  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  updateData(): void {
    this.ordersService.getOrders().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => this.ordersService.updateAll = res.results)
  }

  transition(row: OrderDto) {
    this.router.navigate([`orders/${row.id}`])
  }
}
