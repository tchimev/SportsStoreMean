import * as mongodb from "mongodb";

export interface Supplier {
    name: string;
    city: string;
    state: string;
    _id?: mongodb.ObjectId;
 }