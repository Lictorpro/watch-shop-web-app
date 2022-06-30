import BaseService from "../../common/BaseService";
import IAdapterOptions from '../../../dist/common/IAdapterOptions.interface';
import OrderModel from "./OrderModel.model";

export interface IOrderAdaptionOptions extends IAdapterOptions{
    loadCartData: boolean;
}

export const DefaultOrderAdapterOptions: IOrderAdaptionOptions = {
    loadCartData: true
}

export default class OrderService extends BaseService<OrderModel, IOrderAdaptionOptions>{
    tableName(): string {
        return "order";
    }
    protected adaptToModel(data: any, options: IOrderAdaptionOptions = DefaultOrderAdapterOptions): Promise<OrderModel> {
        return new Promise(async resolve => {
            const order = new OrderModel();

            order.orderId = +data?.order_id;
            order.cartId = +data?.cart_id;
            order.createdAt = new Date(data?.created_at);

            order.status = data?.status;

            if(options.loadCartData){
                order.cart = await this.services.cart.getById(order.cartId, {});
            }

            resolve (order);
        });
    }

    public async getByCartId(cartId: number): Promise<OrderModel | null>{
        return new Promise((resolve, reject) =>{
        this.getAllByFieldNameAndValue("cart_id", cartId, { loadCartData: false })
        .then(result => {
            if(result.length === 0){
                return resolve(null);
            }

            resolve(result[0]);
        })
        .catch(error => {
            reject(error);
        })
        })
        
    }

}