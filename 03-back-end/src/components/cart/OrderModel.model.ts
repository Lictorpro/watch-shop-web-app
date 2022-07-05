import IModel from '../../common/IModel.interface';
import CartModel from './CartModel.model';

export default class OrderModel implements IModel{
    orderId: number;
    cartId: number;
    createdAt: Date;
    status: "pending" | "declined" | "accepted"
    cart: CartModel;
} 