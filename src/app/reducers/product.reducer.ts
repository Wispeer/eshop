import { Action } from '@ngrx/store';
import { Product } from '../models/product.model';

export const ADD_PRODUCT = 'ADD_PRODUCT';

export function addProductReducer(state: Product[] = [], action: any) {
  switch (action.type) {
    case ADD_PRODUCT:
        return [...state, action.payload];
    default:
        return state;
    }
}
export function addProductReducer2(state: Product[] = [], action: any) {
    switch (action.type) {
      case 'TEST':
          return [...state, action.payload];
      default:
          return state;
      }
  }