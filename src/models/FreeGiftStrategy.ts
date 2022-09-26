import { IStrategy } from './IStrategy'
import { IProduct } from './IProduct'
import { ProductUtils } from '../utilities/productUtils'
import { ProductBuilder } from './Product'

class FreeGiftStrategy implements IStrategy {
    valueToTrigger: number
    productSku: string
    giftProduct: IProduct

    constructor() {
        this.valueToTrigger = 1
        this.productSku = ""
        this.giftProduct = {} as IProduct
    }

    getStrategyName(): string {
        return `Buy ${this.valueToTrigger} ${this.productSku} get a free ${this.giftProduct.sku}`
    }

    apply(products: IProduct[]): void {
        const matchedProducts = ProductUtils.getProductsBySku(products, this.productSku)
        const freeProducts = ProductUtils.getProductsBySku(products, this.giftProduct.sku)
        const numberOfFreeProductToGive = Math.floor(matchedProducts.length / this.valueToTrigger)
        if (freeProducts.length < numberOfFreeProductToGive) {
            throw new Error("The order don't have enough free product to redeem.")
        } else {
            // add the credit for free products
            const giftProductCR = new ProductBuilder()
                .sku(this.giftProduct.sku)
                .name(`${this.giftProduct.name} CR`)
                .price(- this.giftProduct.price * numberOfFreeProductToGive)
                .build()
            products.push(giftProductCR)
        }
    }
}

export class FreeGiftStrategyBuilder {
    private readonly freeGiftStrategy: FreeGiftStrategy

    constructor() {
        this.freeGiftStrategy = new FreeGiftStrategy()
    }

    valueToTrigger(value: number): FreeGiftStrategyBuilder {
        this.freeGiftStrategy.valueToTrigger = value
        return this
    }

    productSku(sku: string): FreeGiftStrategyBuilder {
        this.freeGiftStrategy.productSku = sku
        return this
    }

    giftSku(product: IProduct): FreeGiftStrategyBuilder {
        this.freeGiftStrategy.giftProduct = product
        return this
    }

    build(): FreeGiftStrategy {
        return this.freeGiftStrategy
    }
}