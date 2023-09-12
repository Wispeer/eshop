import { CartItem } from './models/cart.model';
import { CartComponent } from './pages/cart/cart.component';
import { Category, Product } from 'src/app/models/product.model';

export interface AppState {
   product: Product;
   products: Product[];
   category: Category;
   categories: Category[];
   cart: CartComponent;
   cartItems: CartItem[];
}