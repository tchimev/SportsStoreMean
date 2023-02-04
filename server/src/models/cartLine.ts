import * as mongodb from "mongodb";

export interface CartLine {
    _id?: mongodb.ObjectId;
    productId: mongodb.ObjectId;
    quantity: number;
}