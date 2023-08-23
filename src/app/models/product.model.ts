export interface Product{
    id: number,
    category: number,
    name: string,
    description: string,
    image: string,
    isPopular: boolean,
    price: number,
    quantity: number,
    created: string,
}

export interface Category{
    name: string,
    id: number
  }

export interface DataSource{
    categories: Category[],
    products: Product[]
  }