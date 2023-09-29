import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LOAD_PRODUCT_DETAILS } from 'src/app/reducers/product.reducer';
 @UntilDestroy()
 
@Component({
  selector: '[app-product-box]',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() product: Product | any;
  
  @Output() addToCart = new EventEmitter();



  constructor(private store: Store<AppState>) {
    this.store.pipe(select((state: any) => {return state.products})).subscribe((state: any) => {
      this.product = state;
    })
  }

  ngOnInit(): void {
  }

  getProductDetails(): void {

  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
    this.store.dispatch({type: LOAD_PRODUCT_DETAILS, payload: this.product})
  }
}