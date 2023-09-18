import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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
      // console.log('state', state);
      this.product = state;
    })

    // this.product$.pipe(untilDestroyed(this)).subscribe(data => data)
  }

  ngOnInit(): void {
    // console.log('product-box this.product', this.product);
    // this.product$.pipe(untilDestroyed(this)).subscribe(data => (this.product = data));
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}