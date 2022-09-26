/**
 * Checkout service.
 * It designed to use Singleton pattern. Call getInstance() to initial the service.
 */
import { ICheckoutService } from './ICheckoutService'
import { IProduct } from '../models/IProduct'
import { IStrategyService } from './IStrategyService'
import { StrategyService } from './StrategyService'

class CheckoutService implements ICheckoutService{
    private static instance: CheckoutService

    /**
     * This StrategyService should be injected by using some framework
     * For this exercise, just manually created in constructor
     */
    private strategyService: IStrategyService

    private constructor() {
        this.strategyService = StrategyService.getInstance()
    }

    public static getInstance(): CheckoutService {
        if (!CheckoutService.instance) {
            CheckoutService.instance = new CheckoutService()
        }
        return CheckoutService.instance
    }

    scan(product: IProduct): void {
        console.log("scan item")
    }

    total(): number {
        return 0
    }
}