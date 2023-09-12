import { AppState } from '../app.state';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

export class ProductService {

  products: Observable<Product[]>;

  constructor(private store: Store<AppState>) {
    this.products = this.store.select(state => state.products);
  }


  addProduct(id: number, category: number, name: string, 
    description: string, image: string, isPopular: boolean, 
    price: number, quantity: number, created: string,) {
      this.store.dispatch({
        type: 'ADD_PRODUCT',
        payload: <Product> {
          id: id,
          category: category,
          name: name,
          description: description,
          image: image,
          isPopular: isPopular,
          price: price,
          quantity: quantity,
          created: created,
        }
      }
    );
  }

  ngOnInit() {
  }
}