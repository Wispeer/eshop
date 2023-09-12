import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { ADD_PRODUCT, addProductReducer } from 'src/app/reducers/product.reducer';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  cartSubscription: any;
  dataSource: CartItem[] | undefined;
  data: any = [];

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }

  constructor(private cartService: CartService, private store: Store) {}

  ngOnInit(){
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items;
    });
    
    console.log(this.cart , 'cart')
    this.store.pipe(select((state: any) => {return state.product})).subscribe((state: any) => {
      console.log('state', state);
      this.data = state;
    })

    this.store.pipe(select((state: any) => {return state.product2})).subscribe((state: any) => {
      console.log('state2', state);
    })
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onClickToAddToStore(): void{
    this.store.dispatch({type: ADD_PRODUCT, payload: 1});
  }

  onClickToAddToStore2(): void{
    this.store.dispatch({type: 'TEST', payload: 1});
  }
    
}