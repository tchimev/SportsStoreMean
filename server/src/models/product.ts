import * as mongodb from "mongodb";
import { Rating } from "./rating";
import { Supplier } from "./supplier";
 
export interface Product {
   name: string;
   description: string;
   category: string;
   price: number;
   supplier: Supplier;
   ratings: Rating[];
   _id?: mongodb.ObjectId;
}