export interface Cart{
    items: Array<CartItem>;
}

export interface CartItem{
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