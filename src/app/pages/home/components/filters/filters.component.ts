import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Category } from 'src/app/models/product.model';
import { LOAD_SELECTED_CATEGORY, LOAD_SELECTED_POPULARITY } from 'src/app/reducers/product.reducer';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html' 
})
export class FiltersComponent implements OnInit {
  
  @Output() showCategory = new EventEmitter<number>();
  @Output() showPopular = new EventEmitter<boolean>();

  categories: Category[] | undefined;
  allItems: boolean = true;
  selectedCategory: Observable<number> |any;
  selectedPopularity: Observable<boolean> | any;
  
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(
      (state: any) => {return state.categories})).subscribe((state: any) => {
      this.categories = state.flat();
    }) 
    this.getCategoryFilter(this.selectedCategory);
    this.selectedPopularity = false;
  }

  onShowCategory(event: MatSelectionListChange): void {
    this.selectedCategory = event.options[0].value.id;
    this.showCategory.next(this.selectedCategory);
    this.getCategoryFilter(this.selectedCategory);
    console.log('event change category ', event.options[0].value.id);
  }

  onShowPopularItems(wantPopular: boolean): void  {
    this.store.dispatch({type: LOAD_SELECTED_POPULARITY, payload: wantPopular});
    console.log('filter.component', wantPopular)
    this.showPopular.next(wantPopular);
  }

  getCategoryFilter(selectedCategory: number) {
    this.store.dispatch({type: LOAD_SELECTED_CATEGORY, payload: selectedCategory});
    return of(selectedCategory)
  }
}