import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {FormsModule} from "@angular/forms";
import { Router} from "@angular/router";
import {AllSearchDto} from "../../../../dto/search.dto";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy{
  search = ''
  searchSubject$ = new Subject<string>()
  destroy$ = new Subject<boolean>()

  @Input() placeHolder = 'Поиск'
  @Input() nameFilter: 'brand' | 'search' | 'price' | 'name' | 'volume' = 'search'
  @Input() inputQueryParams: AllSearchDto = {
    search: ''
  }
  @Input() styles: {[key: string] : boolean} = {

  }

  constructor(private router: Router) {}

  ngOnInit(): void {

    const keys: string[] = Object.keys(this.inputQueryParams)
    const finalQueryParams: {[key: string]: string | number} = {
      page: 1,

    }
    for (const key of keys) {
      finalQueryParams[key] = ''
    }

    this.searchSubject$.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (!!res) {
        finalQueryParams[this.nameFilter] = res
        this.router.navigate(['./'], {queryParams: finalQueryParams, queryParamsHandling: 'merge'})
      } else {
        this.router.navigate(['./'], {queryParams: {page: 1}})
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
