import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {catchError, of, Subject, takeUntil} from "rxjs";
import {WarehousesService} from "../../../warehouses/services/warehouses.service";
import {WarehousesDto} from "../../../../dto/warehouses.dto";
import {ErrorStateMatcher} from "@angular/material/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {OfferService} from "../../services/offer.service";
import {AcceptOfferDto} from "../../../../dto/offer.dto";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmOfferModalComponent} from "../confirm-offer-modal/confirm-offer-modal.component";
import {Router} from "@angular/router";
import {AfterConfirmModalComponent} from "../after-confirm-modal/after-confirm-modal.component";

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss'
})
export class OfferComponent implements OnInit, OnDestroy{
  paymentMethod = ['Наличными при получении', 'Картой при получении']
  deliveryMethod = ['Курьером домой', 'В пункт выдачи']
  wareHouses: WarehousesDto[] = []
  form!: FormGroup

  isDeliveryHome = false

  errorMatcher = new ErrorStateMatcher()
  destroy$ = new Subject<boolean>()

  constructor(
    private warehousesService: WarehousesService,
    private fb: FormBuilder,
    private offerService: OfferService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.warehousesService.getWarehouses().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.wareHouses = res.results
    })

    this.form = this.fb.group({
      promocode: [''],
      payment_method: ['', Validators.required],
      delivery_method: ['', Validators.required],
      delivery_warehouse: ['', Validators.required],
      additional_info: [''],
      delivery_address: [''],
    }, {updateOn: "blur"})

    this.form.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (res['delivery_method'] === 'Курьером домой') {
        this.isDeliveryHome = true
      } else if (res['delivery_method'] === 'В пункт выдачи') {
        this.isDeliveryHome = false
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  submit(): void {
    if (this.form.valid) {
      if (!this.isDeliveryHome) {
        this.form.get('delivery_address')?.setValue('')
      }
      this.offerService.sendOffer(this.form.value).pipe(
        catchError(err => {
          if (err.status === 404) {
            this.form.get('promocode')?.setErrors({
              expired: true
            })
          }
          return of({} as AcceptOfferDto)
        }),
        takeUntil(this.destroy$)
      ).subscribe(res => {
        if (res.id) {
          this.openDialog(res)
        }
      })
    }
  }

  openDialog(data: AcceptOfferDto): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Необходимо подтверждение на создание заказа',
      data
    };
    dialogConfig.width = '350px'
    dialogConfig.height = '550px'
    const dialogRef = this.dialog.open(ConfirmOfferModalComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((res) => {
      if (res) {
        this.offerService.acceptOffer(res).pipe(
          catchError(err => {
            return ''
          }),
          takeUntil(this.destroy$)
        ).subscribe((res) => {
          if (res) {
            this.openTotal('Заказ успешно сформирован')
          } else {
            this.openTotal('Истекло время на подтвержение заказа')
          }
        })
      }
    })
  }

  openTotal(title: string) {
    this.dialog.open(AfterConfirmModalComponent, {
      width: '300px',
      height: '250px',
      disableClose: true,
      data: {
        title
      }
    })
  }
}
