import { StrategyFactory } from './StrategyFactory'
import { IProduct } from './IProduct'
import { IStrategy } from './IStrategy'
import { BulkDiscountStrategyBuilder } from './BulkDiscountStrategy'

export class BulkDiscountStrategyFactory extends StrategyFactory {
    private valueToTrigger: number
    private product: IProduct
    private discountPrice: number

    constructor(valueToTrigger: number, product: IProduct, discountPrice: number) {
        super()
        this.valueToTrigger = valueToTrigger
        this.product = product
        this.discountPrice = discountPrice
    }

    protected getStrategy(): IStrategy {
        return new BulkDiscountStrategyBuilder()
            .valueToTrigger(this.valueToTrigger)
            .product(this.product)
            .discountPrice(this.discountPrice)
            .build()
    }
}