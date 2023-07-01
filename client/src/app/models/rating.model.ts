import { Product } from "./product.model";

export interface Rating {
        _id?: string;
        stars?: number;
        product?: Product;
}