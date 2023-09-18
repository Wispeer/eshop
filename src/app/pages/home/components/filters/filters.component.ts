import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Category, DataSource } from 'src/app/models/product.model';
import { LOAD_CATEGORY, LOAD_SELECTED_CATEGORY } from 'src/app/reducers/product.reducer';
import postJson from 'src/assets/eshop-data.json';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html' 
})
export class FiltersComponent implements OnInit {
  
  @Output() showCategory = new EventEmitter<number>();
  @Output() showPopular = new EventEmitter<boolean>();

  //post: DataSource = postJson;
  categories: Category[] | undefined;
  allItems: boolean = true;
  selectedCategory: Observable<number> |any;
  
  constructor(private store: Store<AppState>) {
    
  }

  ngOnInit(): void {
    // this.categoriesSubscription = this.storeService
    //   .getAllCategories()
    //   .subscribe((response) => {
    //     this.post.categories = response;
    //   });

    this.store.pipe(select(
      (state: any) => {return state.categories})).subscribe((state: any) => {
      console.log('state', state.flat());
      this.categories = state.flat();
      console.log('state.flat()', state.flat());
    }) 

    console.log('categories from filters.component', this.categories);
    this.getCategoryFilter();

  }

  onShowCategory(category: number): void {
    this.showCategory.next(category);
    this.selectedCategory = category;
    console.log('filter.component      selectedCategory', this.selectedCategory)
    this.getCategoryFilter();
  }

  onShowPopularItems(wantPopular: boolean): void{
    this.showPopular.next(wantPopular);
  }

  getCategoryFilter() {
    this.store.dispatch({type: LOAD_SELECTED_CATEGORY, payload: this.selectedCategory});
    console.log('this.selectedCategory from store', this.selectedCategory);
    return of(this.selectedCategory)
  }

  // ngOnDestroy(): void {
  //   if (this.categoriesSubscription) {
  //     this.categoriesSubscription.unsubscribe();
  //   }
  // }
}