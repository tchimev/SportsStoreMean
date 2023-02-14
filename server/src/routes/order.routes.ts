import express from "express";
import { collections } from "../database";
import * as mongodb from "mongodb";

export const orderRouter = express.Router();
orderRouter.use(express.json());

orderRouter.get('/', async (req, res) => {
    try {
        const orders = await collections.orders.find({}).toArray();
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

orderRouter.post("/", async (req, res) => {
    try {
        const order = req.body;
        const result = await collections.orders.insertOne(order);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new order: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new order.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 orderRouter.post("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const order = await collections.orders.findOne(query);
        order.shipped = true;

        const result = await collections.orders.updateOne(query, { $set: order });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated a order: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a order: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a order: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });
