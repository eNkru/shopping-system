import { IStrategy } from '../../src/models/IStrategy'
import { vga, xForYStrategyTestCases } from '../../src/utilities/TestUtils'
import { IProduct } from '../../src/models/IProduct'
import { XForYStrategyBuilder } from '../../src/models/XForYStrategy'

describe("XForYStrategy", () => {
    let xForYStrategy: IStrategy

    beforeEach(() => {
        xForYStrategy = new XForYStrategyBuilder()
            .xValue(2)
            .yValue(1)
            .product(vga)
            .build()
    })

    test.each(xForYStrategyTestCases())("Test that '%s'", (testcase, products, expectedTotal) => {
        const productToTest = products as IProduct[]
        xForYStrategy.apply(productToTest)
        const actualTotal = productToTest.reduce((total, product) => total + product.price, 0)
        expect(actualTotal).toEqual(expectedTotal)
    })
})