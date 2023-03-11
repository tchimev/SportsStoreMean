import { CartLine } from "./cart-line.model";
import { Payment } from "./payment.model";

export interface Order {
    orderId?: string;
    name?: string;
    address?: string;
    payment?: Payment;
    shipped?: boolean;
    products?: CartLine[];
} 

