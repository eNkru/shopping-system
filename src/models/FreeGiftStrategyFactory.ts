import { StrategyFactory } from './StrategyFactory'
import { FreeGiftStrategyBuilder } from './FreeGiftStrategy'
import { IStrategy } from './IStrategy'
import { IProduct } from './IProduct'

export class FreeGiftStrategyFactory extends StrategyFactory {
    private valueToTrigger: number
    private productSku: string
    private giftProduct: IProduct

    constructor(valueToTrigger: number, productSku: string, giftProduct: IProduct) {
        super()
        this.valueToTrigger = valueToTrigger
        this.productSku = productSku
        this.giftProduct = giftProduct
    }

    getStrategy(): IStrategy {
        return new FreeGiftStrategyBuilder()
            .valueToTrigger(this.valueToTrigger)
            .productSku(this.productSku)
            .giftSku(this.giftProduct)
            .build()
    }
}