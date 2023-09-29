import { CartItem } from './models/cart.model';
import { CartComponent } from './pages/cart/cart.component';
import { Category, Product } from 'src/app/models/product.model';

export interface AppState {
   product: Product;
   products: Product[];
   productDetails: Product;
   category: Category;
   categories: Category[];
   selectedCategoryId: number;
   selectedPopularity: boolean;
   cart: CartComponent;
   cartItems: CartItem[];
}