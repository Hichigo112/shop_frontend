import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CartItem} from "../../../../dto/cart.dto";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ProductItemComponent} from "../../../products/components/product-item/product-item.component";
import {CartService} from "../../services/cart.service";
import {PaginationComponent} from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    ProductItemComponent,
    NgIf,
    PaginationComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy{
  cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([])
  cartMessage = ''
  count = 0
  next = ''
  previous = ''

  destroy$ = new Subject<boolean>();
  constructor(private route: ActivatedRoute, private cartService: CartService) {
  }
  ngOnInit(): void {
    this.route.data.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (typeof res['cartData'] === 'object') {
        this.count = res['cartData'].count
        this.next = res['cartData'].next
        this.previous = res['cartData'].previous
        const {results} = res['cartData']
        this.cartItems.next(results[0].items)
      } else {
        this.cartMessage = res['cartData']
      }
    })

    this.route.queryParams.subscribe(res => {
      this.cartService.getCartData(res).pipe(
        takeUntil(this.destroy$)
      ).subscribe(res => {
        this.cartItems.next(res.results[0].items)
      })
    })
  }

  onDeleteCartItem(id: string): void {
    this.cartService.deleteFromCart(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.cartService.getCartData(this.route.queryParams).pipe(
        takeUntil(this.destroy$)
      ).subscribe(res => {
        this.cartItems.next(res.results[0].items)
      })
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
