import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderDto, ShortOrderDto} from "../../../../dto/orders.dto";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {OrdersService} from "../../services/orders.service";
import {catchError, of, Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ToTextPipe} from "../../../shared/pipes/to-text.pipe";

@Component({
  selector: 'app-detail-order',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgForOf,
    ToTextPipe,
    DatePipe
  ],
  templateUrl: './detail-order.component.html',
  styleUrl: './detail-order.component.scss'
})
export class DetailOrderComponent implements OnInit, OnDestroy{
  paidSelect = [{text: 'Оплачено', trust: true}, {text: 'Не оплачено', trust: false}]
  viewedSelect = [{text: 'Просмотрено', trust: true}, {text: 'Не просмотрено', trust: false}]
  statusSelect = ['pending', 'completed', 'canceled', 'preparing', 'waiting']
  detailInfo: OrderDto | null = null
  form!: FormGroup

  destroy$ = new Subject<boolean>()
  constructor(private ordersService: OrdersService, private route: ActivatedRoute, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.ordersService.getOrderById(this.route.snapshot.params['id']).pipe(
      catchError(err => {
        return of(null)
      }),
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.detailInfo = res
      this.reset()
    })
  }




  reset(): void {
    this.form = this.fb.group({
      is_paid: [this.detailInfo?.is_paid],
      is_viewed_by_admin: [this.detailInfo?.is_viewed_by_admin],
      status: [this.detailInfo?.status]
    })
  }

  save(): void {
    if (this.form.valid && this.form.touched) {
      const data: ShortOrderDto = {
        order_number: this.detailInfo?.order_number || 0,
        is_paid: this.form.get('is_paid')?.value,
        is_viewed_by_admin: this.form.get('is_viewed_by_admin')?.value,
        status: this.form.get('status')?.value
      }
      this.ordersService.patchOrder(data, this.detailInfo?.id || '').pipe(
        takeUntil(this.destroy$)
      ).subscribe(res => {
        this.detailInfo = res
        this.reset()
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
