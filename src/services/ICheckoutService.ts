import { IProduct } from '../models/IProduct'

export interface ICheckoutService {
    scan(product: IProduct): void
    total(): number
}