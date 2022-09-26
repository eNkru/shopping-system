import { CheckoutService } from '../../src/services/CheckoutService'
import { IProduct } from '../../src/models/IProduct'
import { checkoutServiceTestCases } from '../../src/utilities/TestUtils'
import { ICheckoutService } from '../../src/services/ICheckoutService'

describe("CheckoutService", () => {
    let checkoutService: ICheckoutService

    beforeEach(() => checkoutService = CheckoutService.getInstance())

    test.each(checkoutServiceTestCases())("Test that '%s'", (testcase, products, expectedTotal) => {
        const productToTest = products as IProduct[]
        productToTest.forEach((product) => checkoutService.scan(product))
        expect(checkoutService.total()).toEqual(expectedTotal)
    })

    afterEach(() => checkoutService.clear())
})