import * as mongodb from "mongodb";
import { Payment } from "./payment";
import { Product } from "./product";

export interface Order {
    _id?: mongodb.ObjectId;
    name: string;
    products: Product[];
    address: string;
    shipped: boolean;
    payment: Payment;
}