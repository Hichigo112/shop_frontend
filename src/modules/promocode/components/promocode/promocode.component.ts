import {Component, OnDestroy, OnInit} from '@angular/core';
import {PromocodeDto} from "../../../../dto/promocode.dto";
import {PromocodeService} from "../../services/promocode.service";
import { Subject, takeUntil} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmDeleteModalComponent
} from "../../../shared/components/confirm-delete-modal/confirm-delete-modal.component";
import {ToTextPipe} from "../../../shared/pipes/to-text.pipe";
import {PromocodeModalFormComponent} from "../promocode-modal-form/promocode-modal-form.component";

@Component({
  selector: 'app-promocode',
  standalone: true,
  imports: [
    NgForOf,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ToTextPipe,
    NgIf
  ],
  templateUrl: './promocode.component.html',
  styleUrl: './promocode.component.scss'
})
export class PromocodeComponent implements OnInit, OnDestroy {
  promocodeArray: PromocodeDto[] = []
  displayedColumns = ['Название', 'Скидка в %', 'Тип', 'Статус', 'Изменить', 'Удалить']
  destroy$ = new Subject<boolean>()
  modalConfig = {
    width: '350px',
    height: '450px',
    disableClose: true,
  }
  constructor(private promocodeService: PromocodeService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.promocodeService.promocodeData$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(res => this.promocodeArray = res)

    if (!this.promocodeArray.length) {
      this.getData()
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  delete(id: string) {

    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: '250px',
      height: '175px',
      disableClose: true,
      data: {
        text: 'Удалить промокод?',
        confirmText: 'Да',
        cancelText: 'Нет'
      }
    })

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: boolean) => {
      if (res) {
        this.promocodeService.deletePromocode(id).pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => this.getData())
      }
    })


  }

  change(promocode: PromocodeDto) {
    const dialogRef = this.dialog.open(PromocodeModalFormComponent, {
      ...this.modalConfig,
      data: promocode
    })

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: boolean) => {
      if (res) this.getData()
    })
  }

  create() {
    const dialogRef = this.dialog.open(PromocodeModalFormComponent, {
      ...this.modalConfig,
      data: {
        id: '',
        code: '',
        discount: '',
        type: '',
        is_active: true,
        title: 'Создание промокода'
      }
    })

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: boolean) => {
      if (res) this.getData()
    })
  }

  getData() {
    this.promocodeService.getPromocodes().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => this.promocodeService.promocode = res.results)
  }
}
