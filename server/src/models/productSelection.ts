import * as mongodb from "mongodb";

export interface ProductSelection {
    _id?: mongodb.ObjectId;
    name: string;
    price: number;
    quantity: number;
}