import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { state } from '@angular/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
 @UntilDestroy()
 
@Component({
  selector: '[app-product-box]',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  product$: Observable<Product> = this.store.select(state => state.product);
  product: Product | null = null;
  @Output() addToCart = new EventEmitter();

  constructor(private store: Store<AppState>) {
    this.product$.pipe(untilDestroyed(this)).subscribe(data => data)
  }

  ngOnInit(): void {
      this.product$.pipe(untilDestroyed(this)).subscribe(data => (this.product = data));
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}