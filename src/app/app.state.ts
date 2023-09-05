import { CartItem } from './models/cart.model';
import { CartComponent } from './pages/cart/cart.component';
import { Product } from 'src/app/models/product.model';

export interface AppState {
   product: Product;
   products: Product[];
   cart: CartComponent;
   cartItem: CartItem[];
}