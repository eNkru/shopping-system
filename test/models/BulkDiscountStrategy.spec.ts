import { IStrategy } from '../../src/models/IStrategy'
import { BulkDiscountStrategyBuilder } from '../../src/models/BulkDiscountStrategy'
import { bulkDiscountStrategyTestCases, mbp, mbpBulkDiscountPrice } from '../../src/utilities/TestUtils'
import { IProduct } from '../../src/models/IProduct'

describe("BulkDiscountStrategy", () => {
    let bulkDiscountStrategy: IStrategy

    beforeEach(() => {
        bulkDiscountStrategy = new BulkDiscountStrategyBuilder()
            .valueToTrigger(4)
            .product(mbp)
            .discountPrice(mbpBulkDiscountPrice)
            .build()
    })

    test.each(bulkDiscountStrategyTestCases())("Test that '%s'", (testcase, products, expectedTotal) => {
        const productToTest = products as IProduct[]
        bulkDiscountStrategy.apply(productToTest)
        const actualTotal = productToTest.reduce((total, product) => total + product.price, 0)
        expect(actualTotal).toEqual(expectedTotal)
    })
})