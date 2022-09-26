import { IProduct } from './IProduct'

class Product implements IProduct {
    name: string
    price: number
    sku: string

    constructor() {
        this.name = ""
        this.price = 0
        this.sku = ""
    }
}

export class ProductBuilder {
    private readonly product: IProduct

    constructor() {
        this.product = new Product()
    }

    name(name: string): ProductBuilder {
        this.product.name = name
        return this
    }

    price(price: number): ProductBuilder {
        this.product.price = price
        return this
    }

    sku(sku: string): ProductBuilder {
        this.product.sku = sku
        return this
    }

    build(): IProduct {
        return this.product
    }
}