import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {AcceptOfferDto} from "../../../../dto/offer.dto";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-confirm-offer-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatDialogActions,
    MatInputModule
  ],
  templateUrl: './confirm-offer-modal.component.html',
  styleUrl: './confirm-offer-modal.component.scss'
})
export class ConfirmOfferModalComponent implements OnInit{
  title = ''
  address = ''
  delivery = ''
  payment = ''
  comment = ''
  promocode = ''
  discountPercent = 0
  total = ''
  total_payment = ''


  constructor(private dialogRef: MatDialogRef<ConfirmOfferModalComponent>, @Inject(MAT_DIALOG_DATA) private data: {
    title: string;
    data: AcceptOfferDto;
  }) {

  }

  ngOnInit(): void {
    this.title = this.data.title
    this.address = this.data.data.delivery_address
    this.delivery = this.data.data.delivery_method
    this.payment = this.data.data.payment_method
    this.comment = this.data.data.additional_info
    this.promocode = this.data.data.promocode
    this.discountPercent = this.data.data.discount_percentage
    this.total = this.data.data.total
    this.total_payment = this.data.data.total_with_discount
  }

  save() {
    this.dialogRef.close(this.data.data.id)
  }

  close() {
    this.dialogRef.close()
  }
}
