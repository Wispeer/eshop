import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DataSource } from 'src/app/models/product.model';
import postJson from 'src/assets/eshop-data.json'

@Injectable({
  providedIn: 'root',
})

export class StoreService {
  constructor() {}

  post: DataSource = postJson;

  getAllProducts() {
    return of(this.post.products)
  }

  getAllCategories(){
    return of(this.post.categories)
  }
}