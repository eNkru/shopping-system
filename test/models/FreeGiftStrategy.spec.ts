import { IStrategy } from '../../src/models/IStrategy'
import { atv, freeGiftStrategyTestCases, ipd } from '../../src/utilities/TestUtils'
import { IProduct } from '../../src/models/IProduct'
import { FreeGiftStrategyBuilder } from '../../src/models/FreeGiftStrategy'

describe("FreeGiftStrategy", () => {
    let freeGiftStrategy: IStrategy

    beforeEach(() => {
        freeGiftStrategy = new FreeGiftStrategyBuilder()
            .valueToTrigger(2)
            .giftSku(atv)
            .productSku(ipd.sku)
            .build()
    })

    test.each(freeGiftStrategyTestCases())("Test that '%s'", (testcase, products, expectedTotal) => {
        const productToTest = products as IProduct[]
        freeGiftStrategy.apply(productToTest)
        const actualTotal = productToTest.reduce((total, product) => total + product.price, 0)
        expect(actualTotal).toEqual(expectedTotal)
    })
})