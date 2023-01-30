import * as mongodb from "mongodb";
import { Product } from "./models/product";
 
export const collections: {
   products?: mongodb.Collection<Product>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("sportsstore");
   //await applySchemaValidation(db);
 
   const productsCollection = db.collection<Product>("Product");
   collections.products = productsCollection;
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
async function applySchemaValidation(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
       },
   };
 
}