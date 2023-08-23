import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataSource } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import postJson from 'src/assets/eshop-data.json';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html' 
})
export class FiltersComponent implements OnInit {
  
  @Output() showCategory = new EventEmitter<number>();
  @Output() showPopular = new EventEmitter<boolean>();

  post: DataSource = postJson;
  categoriesSubscription: Subscription | undefined;
  allItems: boolean = true;
  
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((response) => {
        this.post.categories = response;
      });
      
  }

  onShowCategory(category: number): void {
    this.showCategory.next(category);
  }

  onShowPopularItems(wantPopular: boolean): void{
    this.showPopular.next(wantPopular);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}