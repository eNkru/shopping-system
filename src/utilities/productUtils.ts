import { IProduct } from '../models/IProduct'

/**
 * The utility class for products.
 */
export class ProductUtils {

    /**
     * Get a particular products from the given product array.
     *
     * @param products the product array
     * @param sku the SKU match to return
     */
    public static getProductsBySku(products: IProduct[], sku: string): IProduct[] {
        return products.filter((product) => product.sku === sku)
    }

    /**
     * Shallow clone a IProduct without the methods.
     *
     * @param product the give IProduct to clone
     */
    public static clone(product: IProduct): IProduct {
        return Object.assign(product)
    }
}