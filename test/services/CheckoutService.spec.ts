import { CheckoutService } from '../../src/services/CheckoutService'
import { IProduct } from '../../src/models/IProduct'
import { checkoutServiceTestCases } from '../../src/utilities/TestUtils'

describe("CheckoutService", () => {
    const testcases = checkoutServiceTestCases()
    test.each(testcases)("Test given order %s should return %s", (products, expectedTotal) => {
        const service = CheckoutService.getInstance()
        const productArray = products as IProduct[]
        productArray.forEach((product) => service.scan(product))
        expect(service.total()).toEqual(expectedTotal)
    })
})