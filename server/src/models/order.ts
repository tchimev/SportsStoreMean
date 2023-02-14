import * as mongodb from "mongodb";
import { CartLine } from "./cartLine";
import { Payment } from "./payment";

export interface Order {
    _id?: mongodb.ObjectId;
    name: string;
    products: CartLine[];
    address: string;
    shipped: boolean;
    payment: Payment;
}