import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Product } from 'src/app/models/product.model';
import { LOAD_PRODUCT_DETAILS } from 'src/app/reducers/product.reducer';

@Component({
  selector: 'app-product-details',
  templateUrl: 'product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {

  productDetails: Observable<Product> | any;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<AppState>) {
      this.store.pipe(select((state: any) => {return state.product})).subscribe((state: any) => {
        this.productDetails = state;
     })
  }
  
  ngOnInit(): void {
    
  }
}
