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

    apply(products: IProduct[]): void {
        const matchedProducts = ProductUtils.getProductsBySku(products, this.productSku)
        if (matchedProducts.length) {
            const freeProducts = ProductUtils.getProductsBySku(products, this.giftProduct.sku)
            let numberOfFreeProductToGive = Math.floor(matchedProducts.length / this.valueToTrigger)
            if (freeProducts.length < numberOfFreeProductToGive) {
                // simply add a log in console log.
                // TODO: ideally should warn to user that the free product isn't added in the order (out of scope)
                console.log("The order don't have enough free gift to redeem. Please add the gift")
                numberOfFreeProductToGive = freeProducts.length
            }

            // update the credit for free products
            const creditProductName = `${this.giftProduct.name} CR`
            const giftProductCR = new ProductBuilder()
                .sku(this.giftProduct.sku)
                .name(creditProductName)
                .price(- this.giftProduct.price * numberOfFreeProductToGive)
                .build()
            const newProducts = products.filter((product) => product.name !== creditProductName)
            newProducts.push(giftProductCR)
            products.length = 0
            products.push(...newProducts)
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