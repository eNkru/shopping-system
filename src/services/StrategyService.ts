/**
 * Strategy service.
 * It designed to use Singleton pattern. Call getInstance() to initial the service.
 */
import { IStrategyService } from './IStrategyService'
import { IProduct } from '../models/IProduct'
import { StrategyFactory } from '../models/StrategyFactory'
import { FreeGiftStrategyFactory } from '../models/FreeGiftStrategyFactory'
import { ProductBuilder } from '../models/Product'

export class StrategyService implements IStrategyService{
    private static instance: StrategyService
    private strategies: StrategyFactory[] = []

    private constructor() {
        // add all available promotion strategies.
        // this can be refactoring to a configuration or hot load when strategy changed.
        const gift = new ProductBuilder().sku("vga").name("VGA adapter").price(30).build()
        this.strategies.push(
            new FreeGiftStrategyFactory(
                1,
                "mbp",
                gift
            ))
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