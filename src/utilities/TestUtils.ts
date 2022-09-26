import { ProductBuilder } from '../models/Product'
import { ProductUtils } from './productUtils'

export const checkoutServiceTestCases = () => {
    const ipd = new ProductBuilder()
        .sku("ipd")
        .name("Super iPad")
        .price(549.99)
        .build()
    const mbp = new ProductBuilder()
        .sku("mbp")
        .name("MacBook Pro")
        .price(1399.99)
        .build()
    const atv = new ProductBuilder()
        .sku("atv")
        .name("Apple TV")
        .price(109.50)
        .build()
    const vga = new ProductBuilder()
        .sku("vga")
        .name("VGA adapter")
        .price(30.00)
        .build()

    return [
        [
            // 3 mbp and 3 vga should only price the 3 mbp
            [
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(vga),
                ProductUtils.clone(vga),
                ProductUtils.clone(vga),
            ],
            4199.97
        ],
    ]
}