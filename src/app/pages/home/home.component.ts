import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { ProductFooterComponent } from './components/products-footer/products-footer.component';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@UntilDestroy()

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  providers: [ProductFooterComponent]
})

export class HomeComponent implements OnInit, OnDestroy {

  @Output() nextPageChange = new EventEmitter<number>();
  @Output() previousPageChange = new EventEmitter<number>();

  cols = 3;
  page = 0;
  count = '12';
  sort = 'desc';
  showPopular = false;
  category: number = 0;
  maxPagelimit: number = 0;
  products: Array<Product>  = [];
  showingProducts: Array<Product> | undefined;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService,
    private productFooter: ProductFooterComponent) {}

  ngOnInit(): void {
    this.getProducts();}

  maxPageLimiter(): void{
    this.maxPagelimit = Math.ceil(this.products.length / +this.count) - 1;
    this.productFooter.maxPagelimitInFooter = this.maxPagelimit;
    this.productFooter.page = this.page;
    this.productFooter.maxPageLimiter()
    }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];}

  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();}

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();}

  onShowCategory(newCategory: number): void {
    this.category = newCategory;
    this.getProducts(this.category);}

  onShowPopularItems(wantPopular: boolean): void{
    this.showPopular = wantPopular;
    this.getProducts();}

  getProducts(filterCategory?: number): void {
    this.storeService.getAllProducts().pipe(untilDestroyed(this)).subscribe({
      next: data => {
        this.products = data;
        this.sortProductsByCategory(this.products, filterCategory);
        this.sortProductsByPopularity(this.products);
        this.sortProductsByPrice(this.products);
        this.maxPageLimiter();
        console.log( this.maxPagelimit, "frome HomeComponent");
        this.showingProducts = this.products?.slice(this.page * (+this.count), (this.page * (+this.count))+(+this.count));
      }});}

  sortProductsByCategory(data: Product[], filterCategory?: number):void {
    if(!(filterCategory === 0 || filterCategory === null || filterCategory === undefined)){
    this.products = data.filter(data => data.category === filterCategory);}}

  sortProductsByPopularity(data: Product[]):void {
    if (this.showPopular) {
      this.products = data.filter(data => data.isPopular === this.showPopular);}
    else {
      this.products = data;}}

  sortProductsByPrice(data: Product[]):void {
    if (this.sort === 'asc' ){
      this.products = data.sort((a, b) => a.price - b.price);}
    else {
      this.products = data.sort((a, b) => b.price - a.price);}}

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      id: product.id,
      category: product.category,
      name: product.name,
      image: product.image,
      description: product.description,
      isPopular: product.isPopular,
      price: product.price,
      quantity: 1,
      created: product.created,});}

  onNextPage(page: number): void {
    if (((this.page + 1) * +this.count) < this.products.length){
    this.page ++;
    this.productFooter.page = this.page;
    console.log( this.page, "page");
    console.log( this.productFooter.page, "productFooter.page");
    this.getProducts();}}

  onPreviousPage(page: number): void {
    if (this.page > 0){
    this.page --;
    this.productFooter.page = this.page;
    console.log( this.page, "page");
    console.log( this.productFooter.page, "productFooter.page");
    this.getProducts();}}

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();}}}