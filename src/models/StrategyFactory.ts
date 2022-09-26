import { IStrategy } from './IStrategy'
import { IProduct } from './IProduct'

export abstract class StrategyFactory {
    protected abstract getStrategy(): IStrategy

    public applyStrategy(products: IProduct[]): void {
        const strategy = this.getStrategy()
        strategy.apply(products)
    }
}