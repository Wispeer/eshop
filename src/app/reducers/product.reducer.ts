import { Action } from '@ngrx/store';
import { Category, Product } from '../models/product.model';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const LOAD_PRODUCT = 'LOAD_PRODUCT';
export const LOAD_CATEGORY = 'LOAD_CATEGORY';
export const LOAD_SELECTED_CATEGORY = 'LOAD_SELECTED_CATEGORY';
export const LOAD_SELECTED_POPULARITY = 'LOAD_SELECTED_POPULARITY';
export const LOAD_PRODUCT_DETAILS = 'LOAD_PRODUCT_DETAILS';

export function addProductReducer(state: Product[] = [], action: any) {
  switch (action.type) {
    case ADD_PRODUCT:
        return [...state, action.payload];
    default:
        return state;
    }
}

export function loadProductsReducer(state: Product[] = [], action: any) {
    switch (action.type) {
      case LOAD_PRODUCT:
          return [...state, action.payload];
      default:
          return state;
      }
}

export function loadCategoriesReducer(state: Category[] = [], action2: any) {
    switch (action2.type) {
      case LOAD_CATEGORY:
          return [...state, action2.payload];
      default:
          return state;
      }
}

export function loadSelectedCategoryReducer(state: number[] = [], action3: any) {
    switch (action3.type) {
        case LOAD_SELECTED_CATEGORY:
            return [...[state], action3.payload];
        default:
            return state;
    }
}

export function loadSelectedPopularityReducer(state: boolean[] = [], action4: any) {
    switch (action4.type) {
        case LOAD_SELECTED_POPULARITY:
            return [...[state], action4.payload];
        default:
            return state;
    }
}

export function loadProductDetailsReducer(state: Product[] = [], action5: any) {
    switch (action5.type) {
        case LOAD_PRODUCT_DETAILS:
            return [...[state], action5.payload];
        default:
            return state;
    }
}