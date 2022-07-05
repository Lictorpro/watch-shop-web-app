import BaseService from "../../common/BaseService";
import CartModel from './CartModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import { ICartContentItem } from './CartModel.model';

export interface ICartAdapterOptions extends IAdapterOptions{

}

export default class CartService extends BaseService<CartModel, ICartAdapterOptions>{

    tableName(): string {
        return "cart";
    }
    protected adaptToModel(data: any, options: ICartAdapterOptions = {}): Promise<CartModel> {
        return new Promise(async resolve => {
            const cart = new CartModel();

            cart.cartId = +data?.cart_id;
            cart.userId = +data?.user_id;
            cart.createdAt = new Date(data?.created_at);

            cart.isUsed = false;

            const cartOrder = await this.services.order.getByCartId(cart.cartId);

            if(cartOrder){
                cart.isUsed = true;
            }

            cart.content = [];

            this.getAllFromTableByFieldNameAndValue("cart_content", "cart_id", cart.cartId)
            .then(async result => {
                cart.content = await Promise.all(result.map(this.fillOutCartContentItemData));

                return cart;
            })
            .then(cart =>{
                resolve(cart);
            })

            resolve(cart);
        });
    }

     private async fillOutCartContentItemData(data: {item_id: number, quantity: number}): Promise<ICartContentItem>{
          return new Promise(resolve =>{
              this.getAllFromTableByFieldNameAndValue<{ item_id: number }>("item", "item_id", data.item_id)
            .then(items =>{
                if(items.length === 0){
                    throw {
                        status: 404,
                        message: "Item not found!"
                    }
                }

                return items[0];
                
              }).then(item => {
                return this.services.item.getById(item.item_id, { loadBandType: false, loadCategory: false, hideInactiveCategories: false })
              })
         })
      }

    async getUserCart(id: number): Promise<CartModel>{
        return new Promise((resolve, reject) => {
            this.getAllByUserId(id)
            .then(carts => {
                if(carts.length === 0){
                    return this.createNewCart(id);
                }

                const lastCart = carts[carts.length - 1];

                if(lastCart.isUsed){
                    return this.createNewCart(id);
                }

                return lastCart;
            })
            .then(cart => {
                resolve (cart);
            })
            .catch(error => {
                reject(error);
            })
        });
    }

    async getAllByUserId(userId: number, options: ICartAdapterOptions = {}): Promise<CartModel[]>{
        return this.getAllByFieldNameAndValue("user_id", userId, options);
    }

    private async createNewCart(userId: number): Promise<CartModel>{
        return this.baseAdd(
            {user_id: userId}, {}
        );
    }

    public async editCartContentItemQuantity(cartId: number, itemId: number, quantity: number): Promise<CartModel>{
        return new Promise((resolve, reject) =>{
            const sql = `UPDATE
                       cart_content
                     SET
                       cart_content.quantity = ?
                    WHERE
                       cart_content.cart_id = ?
                       AND cart_content.item_id = ?`;
        this.db.execute(sql, [quantity, cartId, itemId])
        .then(result => {
            resolve(this.getById(cartId, {}))
        })
        .catch(error =>{
            reject(error);
        })
        })
    }

    public async addCartContentItem(cartId: number, itemId: number, quantity: number): Promise<CartModel>{
        return new Promise((resolve, reject) => {
            const sql = `INSERT
            cart_content
        SET
            cart_content.quantity = ?,
            cart_content.cart_id = ?,
            cart_content.item_id = ?`;

            this.db.execute(sql, [quantity, cartId, itemId])
            .then(result => {
                resolve(this.getById(cartId, {}))
            })
            .catch(error =>{
                reject(error);
            })  
        })

    }

    public async deleteCartContentItem(cartId: number, itemId: number): Promise<CartModel>{
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM
            cart_content
        WHERE
            cart_content.cart_id = ?
            AND
            cart_content.item_id = ?`;

            this.db.execute(sql, [cartId, itemId])
            .then(result => {
                resolve(this.getById(cartId, {}))
            })
            .catch(error =>{
                reject(error);
            })  
        })

    }

}