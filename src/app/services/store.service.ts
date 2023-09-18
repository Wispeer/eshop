import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Category, DataSource, Product } from 'src/app/models/product.model';
import postJson from 'src/assets/eshop-data.json'
import { AppState } from '../app.state';
import { LOAD_CATEGORY, LOAD_PRODUCT, LOAD_SELECTED_CATEGORY } from '../reducers/product.reducer';

@Injectable({
  providedIn: 'root',
})

export class StoreService {

  post: DataSource = postJson;
  products: Observable<Product[]> | any;
  categories: Observable<Category[]> | any;
  selectedCategory: Observable<number> |any;
  
  constructor(private store: Store<AppState>) {
    this.products = this.store.select(state => state.products);
    this.categories = this.store.select(state => state.categories);
  }

  ngOnInit(): void {
  }

  getAllProducts() {
    this.store.dispatch({type: LOAD_PRODUCT, payload: this.post.products});
    console.log('this.products from store', this.post.products);
    return of(this.post.products)
  }

  getAllCategories() {
    this.store.dispatch({type: LOAD_CATEGORY, payload: this.post.categories});
    console.log('this.categories from store', this.post.categories);
    return of(this.post.categories)
  }
  
  setProducts(products: Product[]) {
    
  }
}