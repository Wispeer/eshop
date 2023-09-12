import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Category, DataSource, Product } from 'src/app/models/product.model';
import postJson from 'src/assets/eshop-data.json'
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root',
})

export class StoreService {

  post: DataSource = postJson;
  products: any;
  categories: any;
  
  constructor(private store: Store<AppState>) {
    this.products = this.store.select(state => state.products);
    this.categories = this.store.select(state => state.categories);
  }

  getAllProducts() {
    this.products = this.post.products;
    return of(this.post.products)
  }

  getAllCategories(){
    this.categories = this.post.categories;
    return of(this.post.categories)
  }
}