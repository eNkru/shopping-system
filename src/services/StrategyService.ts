/**
 * Strategy service.
 * It designed to use Singleton pattern. Call getInstance() to initial the service.
 */
import { IStrategyService } from './IStrategyService'
import { IProduct } from '../models/IProduct'
import { StrategyFactory } from '../models/StrategyFactory'
import { FreeGiftStrategyFactory } from '../models/FreeGiftStrategyFactory'
import { ProductBuilder } from '../models/Product'
import { XForYStrategyFactory } from '../models/XForYStrategyFactory'
import { BulkDiscountStrategyFactory } from '../models/BulkDiscountStrategyFactory'

export class StrategyService implements IStrategyService{
    private static instance: StrategyService
    private strategies: StrategyFactory[] = []

    private constructor() {
        // add all available promotion strategies.
        // this can be refactoring to a configuration or hot load when strategy changed.

        // add buy one mbp get free vga
        const gift = new ProductBuilder().sku("vga").name("VGA adapter").price(30).build()
        this.strategies.push(
            new FreeGiftStrategyFactory(
                1,
                "mbp",
                gift
            ))

        // add 3 for 2 deal for atv
        const xForYProduct = new ProductBuilder().sku("atv").name("Apple TV").price(109.50).build()
        this.strategies.push(
            new XForYStrategyFactory(3, 2, xForYProduct)
        )

        // add bulk discount for ipd
        const bulkDiscountProduct = new ProductBuilder().sku("ipd").name("Super iPad").price(549.99).build()
        this.strategies.push(
            new BulkDiscountStrategyFactory(5, bulkDiscountProduct, 499.99)
        )
    }

    public static getInstance(): StrategyService {
        if (!StrategyService.instance) {
            StrategyService.instance = new StrategyService()
        }
        return StrategyService.instance
    }

    apply(products: IProduct[]): void {
        this.strategies.forEach((strategy) => strategy.applyStrategy(products))
    }
}