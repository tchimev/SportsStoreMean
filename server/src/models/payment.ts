import * as mongodb from "mongodb";

export interface Payment {
    _id?: mongodb.ObjectId;
    cardNumber: string;
    cardExpiry: string;
    cardSecurityCode: string;
    authCode: boolean;
    total: number;
}