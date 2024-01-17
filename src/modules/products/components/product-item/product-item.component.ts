import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {CurrencyPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {ProductsDto} from "../../../../dto/products.dto";
import {CartService} from "../../../cart/services/cart.service";
import {debounceTime, fromEvent, Subject, takeUntil} from "rxjs";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    CurrencyPipe,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductItemComponent implements OnDestroy, AfterViewChecked{

  @Input() product!: ProductsDto
  @Input() isCart = false
  @Input() quantity = 0
  @Input() cartIdDataBase = ''

  @Output() deleteFromCart = new EventEmitter<string>()
  @Output() addToOffer = new EventEmitter<string>()

  destroy$ = new Subject<boolean>()
  isWaitServer = false
  isFromProduct = false
  isFirstSubscribe = true

  @ViewChild('minusBtn', { static: false })
  minusBtn: MatButton | undefined;

  @ViewChild('plusBtn', { static: false })
  plusBtn: MatButton | undefined;

  constructor(private cartService: CartService) {
  }


  addCart(id :string): void {
    this.cartService.addProductCart(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.isFromProduct = true
      this.quantity = res.quantity
      this.cartIdDataBase = res.id
    })
  }

  plusQuantity(): void {
    const quantity = this.quantity + 1
    this.updateProductInCart(quantity)
  }

  minusQuantity(): void {
    if (this.quantity - 1 > 0) {
      const quantity = this.quantity - 1
      this.updateProductInCart(quantity)
    } else {
      this.deleteProducts()
    }
  }

  updateProductInCart(quantity: number): void {
    this.toggleWait()
    const data = {
      product: this.product.id,
      quantity
    }
    this.cartService.patchProduct(data, this.cartIdDataBase).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.quantity = res.quantity
      this.isWaitServer = false
    })
  }

  deleteProducts(): void {
    if (this.isCart) {
      this.deleteFromCart.emit(this.cartIdDataBase)
    } else {
      this.cartService.deleteFromCart(this.cartIdDataBase).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.isFromProduct = false
        this.isWaitServer = false
      })
    }
  }

  toggleWait(): void {
    this.isWaitServer = !this.isWaitServer
  }

  ngAfterViewChecked(): void {
    if (this.plusBtn && this.minusBtn && this.isFirstSubscribe) {
      this.isFirstSubscribe = false
      fromEvent(this.plusBtn._elementRef.nativeElement, 'click').pipe(
        debounceTime(350),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.plusQuantity()
      })

      fromEvent(this.minusBtn._elementRef.nativeElement, 'click').pipe(
        debounceTime(350),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.minusQuantity()
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
