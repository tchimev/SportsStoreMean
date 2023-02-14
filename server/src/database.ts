import * as mongodb from "mongodb";
import { Order } from "./models/order";
import { Product } from "./models/product";
import { Supplier } from "./models/supplier";
 
export const collections: {
   products?: mongodb.Collection<Product>;
   suppliers?: mongodb.Collection<Supplier>;
   orders?: mongodb.Collection<Order>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("sportsstore");
   //await applySchemaValidation(db);
 
   collections.products = db.collection<Product>("Product");
   collections.suppliers = db.collection<Supplier>("Supplier");
   collections.orders = db.collection<Order>("Order");
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
async function applySchemaValidation(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
       },
   };
 
}