import { IStrategy } from './IStrategy'
import { IProduct } from './IProduct'
import { ProductUtils } from '../utilities/productUtils'
import { ProductBuilder } from './Product'

class BulkDiscountStrategy implements IStrategy {
    valueToTrigger: number
    product: IProduct
    discountPrice: number

    constructor() {
        this.valueToTrigger = 0
        this.product = {} as IProduct
        this.discountPrice = 0
    }

    apply(products: IProduct[]): void {
        const matchedProducts = ProductUtils.getProductsBySku(products, this.product.sku)
        if (matchedProducts.length && matchedProducts.length >= this.valueToTrigger) {
            const creditProductName = `${this.product.name} CR`
            const discountProductCR = new ProductBuilder()
                .sku(this.product.sku)
                .name(creditProductName)
                .price(- (this.product.price - this.discountPrice) * matchedProducts.length)
                .build()
            const newProducts = products.filter((product) => product.name !== creditProductName)
            newProducts.push(discountProductCR)
            products.length = 0
            products.push(...newProducts)
        }
    }
}

export class BulkDiscountStrategyBuilder {
    private readonly bulkDiscountStrategy: BulkDiscountStrategy

    constructor() {
        this.bulkDiscountStrategy = new BulkDiscountStrategy()
    }

    valueToTrigger(value: number): BulkDiscountStrategyBuilder {
        this.bulkDiscountStrategy.valueToTrigger = value
        return this
    }

    product(product: IProduct): BulkDiscountStrategyBuilder {
        this.bulkDiscountStrategy.product = product
        return this
    }

    discountPrice(discountPrice: number): BulkDiscountStrategyBuilder {
        this.bulkDiscountStrategy.discountPrice = discountPrice
        return this
    }

    build(): BulkDiscountStrategy {
        return this.bulkDiscountStrategy
    }
}