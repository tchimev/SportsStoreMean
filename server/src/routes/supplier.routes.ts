import express from "express";
import { collections } from "../database";
import * as mongodb from "mongodb";

export const supplierRouter = express.Router();
supplierRouter.use(express.json());

supplierRouter.get('/', async (req, res) => {
    try {
        const suppliers = await collections.suppliers.find({}).toArray();
        res.status(200).send(suppliers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

supplierRouter.post("/", async (req, res) => {
    try {
        const supplier = req.body;
        const result = await collections.suppliers.insertOne(supplier);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new supplier: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new supplier.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 supplierRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const supplier = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.suppliers.updateOne(query, { $set: supplier });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated a supplier: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a supplier: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a supplier: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 supplierRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.suppliers.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed a supplier: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a supplier: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a supplier: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });