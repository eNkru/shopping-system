import { IProduct } from './IProduct'

export interface IStrategy {
    getStrategyName(): string
    apply(products: IProduct[]): void
}