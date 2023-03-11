import { Supplier } from "./supplier.model";
import { Rating } from "./rating.model";

export interface Product {
        productId?: string;
        name?: string;
        category?: string;
        description?: string;
        price?: number;
        supplier?: Supplier;
        ratings?: Rating[];
}