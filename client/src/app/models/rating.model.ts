import { Product } from "./product.model";

export interface Rating {
        ratingId?: string;
        stars?: number;
        product?: Product;
}