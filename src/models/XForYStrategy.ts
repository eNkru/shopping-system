import { IStrategy } from './IStrategy'
import { IProduct } from './IProduct'
import { ProductUtils } from '../utilities/productUtils'
import { ProductBuilder } from './Product'

class XForYStrategy implements IStrategy {
    xValue: number
    yValue: number
    product: IProduct

    constructor() {
        this.xValue = 0
        this.yValue = 0
        this.product = {} as IProduct
    }

    apply(products: IProduct[]): void {
        const matchedProducts = ProductUtils.getProductsBySku(products, this.product.sku)
        if (matchedProducts.length) {
            const numberOfApply = Math.floor(matchedProducts.length / this.xValue)
            if (numberOfApply > 0) {
                const creditName = `${this.product.name} CR`
                const numberOfCredit = numberOfApply * (this.xValue - this.yValue)
                const creditProduct = new ProductBuilder()
                    .sku(this.product.sku)
                    .name(creditName)
                    .price(- this.product.price * numberOfCredit)
                    .build()
                const newProducts = products.filter((product) => product.name !== creditName)
                newProducts.push(creditProduct)
                products.length = 0
                products.push(...newProducts)
            }
        }
    }
}

export class XForYStrategyBuilder {
    private readonly xForYStrategy: XForYStrategy

    constructor() {
        this.xForYStrategy = new XForYStrategy()
    }

    xValue(x: number): XForYStrategyBuilder {
        this.xForYStrategy.xValue = x
        return this
    }

    yValue(y: number): XForYStrategyBuilder {
        this.xForYStrategy.yValue = y
        return this
    }

    product(product: IProduct): XForYStrategyBuilder {
        this.xForYStrategy.product = product
        return this
    }

    build(): XForYStrategy {
        return this.xForYStrategy
    }
}