import { StrategyFactory } from './StrategyFactory'
import { IProduct } from './IProduct'
import { IStrategy } from './IStrategy'
import { XForYStrategyBuilder } from './XForYStrategy'

export class XForYStrategyFactory extends StrategyFactory {
    private xValue: number
    private yValue: number
    private product: IProduct

    constructor(xValue: number, yValue: number, product: IProduct) {
        super()
        this.xValue = xValue
        this.yValue = yValue
        this.product = product
    }

    protected getStrategy(): IStrategy {
        return new XForYStrategyBuilder()
            .xValue(this.xValue)
            .yValue(this.yValue)
            .product(this.product)
            .build()
    }
}