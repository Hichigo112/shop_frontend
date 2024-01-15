import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {BrandDto} from "../../../../dto/brand.dto";
import {UserTableDto} from "../../../../dto/user.dto";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy{

  userData: UserTableDto[] = []
  displayedColumns = ['Имя', 'Почта', 'Телефон']

  destroy$ = new Subject<boolean>()
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.usersData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.userData = res
    })

    if (!this.userData.length) this.getData()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  getData() {
    this.userService.getUsersTable().pipe(
      takeUntil(this.destroy$),
    ).subscribe(res=> this.userService.setData = res.results)
  }
}
