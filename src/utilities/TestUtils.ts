import { ProductBuilder } from '../models/Product'
import { ProductUtils } from './productUtils'

export const ipd = new ProductBuilder()
    .sku("ipd")
    .name("Super iPad")
    .price(549.99)
    .build()

export const mbp = new ProductBuilder()
    .sku("mbp")
    .name("MacBook Pro")
    .price(1399.99)
    .build()

export const mbpBulkDiscountPrice = 1099.99

export const atv = new ProductBuilder()
    .sku("atv")
    .name("Apple TV")
    .price(109.50)
    .build()

export const vga = new ProductBuilder()
    .sku("vga")
    .name("VGA adapter")
    .price(30.00)
    .build()

export const bulkDiscountStrategyTestCases = () => {
    return [
        [
            `buy 1 ${mbp.name} with full price`,
            [
                ProductUtils.clone(mbp),
            ],
            mbp.price
        ],
        [
            `buy 3 ${mbp.name} with full price`,
            [
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
            ],
            mbp.price * 3
        ],
        [
            `buy 4 ${mbp.name} with price ${mbpBulkDiscountPrice}`,
            [
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
            ],
            1099.99 * 4
        ],
        [
            `buy 4 and more ${mbp.name} with price ${mbpBulkDiscountPrice}`,
            [
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
            ],
            1099.99 * 5
        ],
        [
            `buy 10 ${mbp.name} still with price ${mbpBulkDiscountPrice}`,
            [
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
                ProductUtils.clone(mbp),
            ],
            1099.99 * 10
        ],
    ]
}

export const freeGiftStrategyTestCases = () => {
    return [
        [
            `buy 1 ${ipd.name} will not get a free ${atv.name}`,
            [
                ProductUtils.clone(ipd),
                ProductUtils.clone(atv),
            ],
            ipd.price + atv.price
        ],
        [
            `buy 2 ${ipd.name} get a free ${atv.name}`,
            [
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
                ProductUtils.clone(atv),
            ],
            ipd.price * 2
        ],
        [
            `buy 3 ${ipd.name} will only get 1 free ${atv.name}`,
            [
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
                ProductUtils.clone(atv),
                ProductUtils.clone(atv),
            ],
            ipd.price * 3 + atv.price
        ],
        [
            `buy 4 ${ipd.name} will get 2 free ${atv.name}`,
            [
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
                ProductUtils.clone(atv),
                ProductUtils.clone(atv),
            ],
            ipd.price * 4
        ],
        [
            `buy 5 ${ipd.name} will still get 2 free ${atv.name}`,
            [
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
                ProductUtils.clone(atv),
                ProductUtils.clone(atv),
                ProductUtils.clone(atv),
            ],
            ipd.price * 5 + atv.price
        ],
    ]
}

export const xForYStrategyTestCases = () => {
    return [
        [
            `buy 1 ${vga.name} for normal price`,
            [
                ProductUtils.clone(vga),
            ],
            vga.price
        ],
        [
            `buy 2 ${vga.name} get 1 free`,
            [
                ProductUtils.clone(vga),
                ProductUtils.clone(vga),
            ],
            vga.price
        ],
        [
            `buy 3 ${vga.name} still get 1 free`,
            [
                ProductUtils.clone(vga),
                ProductUtils.clone(vga),
                ProductUtils.clone(vga),
            ],
            vga.price * 2
        ],
        [
            `buy 4 ${vga.name} will get 2 free`,
            [
                ProductUtils.clone(vga),
                ProductUtils.clone(vga),
                ProductUtils.clone(vga),
                ProductUtils.clone(vga),
            ],
            vga.price * 2
        ],
        [
            `buy 5 ${vga.name} will still get 2 free`,
            [
                ProductUtils.clone(vga),
                ProductUtils.clone(vga),
                ProductUtils.clone(vga),
                ProductUtils.clone(vga),
                ProductUtils.clone(vga),
            ],
            vga.price * 3
        ],
    ]
}

export const checkoutServiceTestCases = () => {
    return [
        [
            "we're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only",
            [
                ProductUtils.clone(atv),
                ProductUtils.clone(atv),
                ProductUtils.clone(atv),
            ],
            atv.price * 2
        ],
        [
            "the brand new Super iPad will have a bulk discounted applied, where the price will drop to $499.99 each, if someone buys more than 4",
            [
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
                ProductUtils.clone(ipd),
            ],
            499.99 * 5
        ],
        [
            "we will bundle in a free VGA adapter free of charge with every MacBook Pro sold",
            [
                ProductUtils.clone(mbp),
                ProductUtils.clone(vga),
            ],
            mbp.price
        ],
    ]
}