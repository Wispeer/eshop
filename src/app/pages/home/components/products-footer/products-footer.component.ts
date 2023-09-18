import { Component, EventEmitter, Injectable, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeComponent } from '../../home.component';

@Component({
  selector: 'app-products-footer',
  templateUrl: './products-footer.component.html',
})
export class ProductFooterComponent implements OnInit ,OnChanges{

  @Output() nextPageChange = new EventEmitter<number>();
  @Output() previousPageChange = new EventEmitter<number>();

  page: number = 0;
  maxPagelimitInFooter: number = 0;
  productsSubscription: Subscription | undefined;

  constructor() {}

  ngOnInit(): void {
    this.onNextPage(this.page);
    this.onPreviousPage(this.page);
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    this.onNextPage(this.page);
    this.onPreviousPage(this.page);
  }

  maxPageLimiter(): void{
    this.maxPagelimitInFooter = this.maxPagelimitInFooter;
    // console.log( this.maxPagelimitInFooter, "products-footer");
  }

  onNextPage(page: number): void {
    if(page < this.maxPagelimitInFooter)
    page = this.page;
    this.nextPageChange.emit(page);
    // console.log( page, "page");
  }

  onPreviousPage(page: number): void {
    if(this.page >= 1) {
      page = this.page;
      this.previousPageChange.emit(page);
      // console.log( page, "page");
    }
  }
}