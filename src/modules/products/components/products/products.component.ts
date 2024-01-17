import { Component, OnDestroy, OnInit} from '@angular/core';
import {ProductItemComponent} from "../product-item/product-item.component";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, of, Subject, takeUntil} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProductModalFormComponent} from "../product-modal-form/modal-form.component";
import {AuthService} from "../../../auth/services/auth.service";
import {MatButtonModule} from "@angular/material/button";
import {PaginationComponent} from "../../../shared/components/pagination/pagination.component";
import {SearchComponent} from "../../../shared/components/search/search.component";
import {ProductsDto, ProductsParams} from "../../../../dto/products.dto";
import {ProductsService} from "../../services/products.service";
import { searchArray } from '../../../../constants/searchsArray.constant';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductItemComponent,
    NgForOf,
    AsyncPipe,
    PaginationComponent,
    SearchComponent,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productItems: Subject<ProductsDto[]> = new Subject<ProductsDto[]>()
  destroy$ : Subject<boolean> = new Subject<boolean>()
  count = 0
  next = ''
  previous = ''
  isAdmin: boolean | null = null


  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private authService: AuthService
              ) {
  }
  ngOnInit(): void {

    this.authService.isAdmin.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.isAdmin = res
    })

    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: ProductsParams) => {
      this.productsService.getProducts(res).pipe(
        catchError(err => {
          if (err.status === 404) this.router.navigate(['/not-found'])
          return of()
        }),
        takeUntil(this.destroy$)
      ).subscribe(res => {
        const data = res.results
        this.count = res.count
        this.next = res.next
        this.previous = res.previous
        this.productItems.next(data)
      })
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Добавление нового продукта',
    };
    dialogConfig.width = '400px'
    dialogConfig.height = '700px'
    this.dialog.open(ProductModalFormComponent, dialogConfig);

  }

  protected readonly searchArray = searchArray;
}
