import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {BrandDto} from "../../../../dto/brand.dto";
import {MatPaginatorModule} from "@angular/material/paginator";
import {Subject, takeUntil} from "rxjs";
import {BrandService} from "../../services/brand.service";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../../auth/services/auth.service";
import {NgIf} from "@angular/common";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BrandsModalFormComponent} from "../brands-modal-form/brands-modal-form.component";

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    NgIf
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
    this.brandService.getBrands().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.dataSource = new MatTableDataSource<Pick<BrandDto, "id" | "name" | "icon">>(res.results)
    })

    this.authService.isAdmin.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => this.isAdmin = res)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: '1',
      title: 'Добавление нового бренда',
    };
    dialogConfig.width = '350px'
    dialogConfig.height = '350px'


    const dialogRef = this.dialog.open(BrandsModalFormComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (res) {
        const brand = {
          ...res,
          margin: 0
        }
        this.brandService.createBrand(brand).pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => {
          this.brandService.getBrands().pipe(
            takeUntil(this.destroy$)
          ).subscribe(res => {
            this.dataSource = new MatTableDataSource<Pick<BrandDto, "id" | "name" | "icon">>(res.results)
          })
        })
      }
    })
  }
}
