import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart.model';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';

export class StoreCart implements OnInit {

  CartProducts: Observable<Product[]>;
  
  ngOnInit(): void {
      throw new Error('Method not implemented.');
  }

  storeCart!: Observable<CartItem[]>;

  constructor(private store: Store<AppState>) {
    this.CartProducts = this.store.select(state => state.products);
  }

  addProductToCart(id: number, category: number, name: string, 
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
}