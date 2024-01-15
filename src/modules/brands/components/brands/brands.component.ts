import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {Subject, takeUntil} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../../auth/services/auth.service";
import {NgIf} from "@angular/common";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

import {MatIconModule} from "@angular/material/icon";
import {BrandDto} from "../../../../dto/brand.dto";
import {BrandService} from "../../services/brand.service";
import {BrandsModalFormComponent} from "../brands-modal-form/brands-modal-form.component";
import {
  ConfirmDeleteModalComponent
} from "../../../shared/components/confirm-delete-modal/confirm-delete-modal.component";

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    NgIf,
    MatIconModule
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['name', 'icon'];
  dataSource = new MatTableDataSource<Pick<BrandDto, 'id' | 'name' | 'icon'>>([])

  destroy$ = new Subject<boolean>()

  isAdmin: boolean | null = null

  constructor(private brandService: BrandService, private authService: AuthService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
      this.updateTableInfo()

    this.authService.isAdmin.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.isAdmin = res
      if (res) this.displayedColumns.push('update', 'delete')
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  openDialog(data?: {id: string; title: string; name: string; icon: string;}) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data || {
      id: '',
      title: 'Добавление нового бренда',
      name: '',
      icon: ''
    };
    dialogConfig.width = '350px'
    dialogConfig.height = '350px'


    const dialogRef = this.dialog.open(BrandsModalFormComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (res) {
        this.updateTableInfo()
      }
    })
  }

  update(data: Pick<BrandDto, "id" | "name" | "icon">): void {
    const dialogData = {
      ...data,
      title: 'Обновление бренда'
    }

    this.openDialog(dialogData)
  }

  delete(id: string) : void{
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: '250px',
      height: '175px',
      disableClose: true,
      data: {
        text: 'Удалить бренд?',
        confirmText: 'Да',
        cancelText: 'Нет'
      }
    })

    dialogRef.afterClosed().pipe().subscribe((res: boolean) => {
      if (res) {
        this.brandService.deleteBrand(id).subscribe(() => {
          this.updateTableInfo()
        })
      }
    })
  }

  updateTableInfo(): void {
      this.brandService.getBrands().pipe(
          takeUntil(this.destroy$)
      ).subscribe(res => {
          this.dataSource = new MatTableDataSource<Pick<BrandDto, "id" | "name" | "icon">>(res.results)
      })
  }
}
