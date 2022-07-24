import ICart from './ICart.model';
export default interface IOrder {
    orderId: number;
    cartId: number;

    createdAt: string;
    status: "pending" | "declined" | "accepted"
    cart: ICart;
}