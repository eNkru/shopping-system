import { IProduct } from '../models/IProduct'

export interface IStrategyService {
    apply(products: IProduct[]): void
}