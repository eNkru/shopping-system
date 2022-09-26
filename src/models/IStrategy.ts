import { IProduct } from './IProduct'

export interface IStrategy {
    apply(products: IProduct[]): void
}