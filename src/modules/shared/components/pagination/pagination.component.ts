import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NgClass
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges{
  @Input() count = 0
  @Input() next = ''
  @Input() previous = ''
  @Input() queryParamsHandling: '' | 'merge' | 'preserve' = ''

  maxViewPages = 8
  pagesData: number[] = []
  visibleData: number[] = []
  value = 1
  pagesCount = 0
  start = 0
  end = 8

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('count' in changes) {
      this.count = changes['count'].currentValue
    }
    if ('next' in changes) {
      this.next = changes['next'].currentValue
    }
    if ('previous' in changes) {
      this.previous = changes['previous'].currentValue
    }
    this.value = 0
    this.start = 1
    this.end = 8
    this.updateLinks()
  }

  updateLinks() {
    this.pagesCount = Math.ceil(this.count / 10)
    this.pagesData = [...Array(this.pagesCount).keys()].map(el => el + 1)
    this.updateVisibleData()
  }

  updateValue(value: number) {
    this.value = value
    this.updateVisibleData()
  }

  private updateVisibleData() {
    if (this.pagesData.length) {
      if (this.value - this.start > 4) {
        this.start += 1
        this.end += 1
      } else {
        this.start - 1 >= 0 ? this.start = this.start - 1 : 0;
        this.end - 1 >= 8 ? this.end = this.end - 1 : this.maxViewPages
      }
      if (this.pagesData.length - this.start <= this.maxViewPages - 1) {
        this.start - 1 > 0 ? this.start = this.start - 1 : 0
        this.end -= 1
      }

      this.visibleData = this.pagesData.slice(this.start, this.end)
    } else {
      this.visibleData = []
    }
  }
}
