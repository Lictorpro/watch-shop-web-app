import { Request, Response } from "express";
import BaseController from "../../common/BaseController";
import { AddToCartValidator, IAddToCartDto } from './dto/IAddToCart.dto';

export default class CartController extends BaseController{

    getCart(req: Request, res: Response){
        this.services.cart.getUserCart(req.authorisation?.id)
        .then(cart => {
            res.send(cart);
        })
        .catch(error => {
          res.status(500).send(error?.message);  
        });
    }

    addToCart(req: Request, res: Response){
        const data = req.body as IAddToCartDto;

        if(!AddToCartValidator){
            return res.status(400).send(AddToCartValidator.errors);
        }

        this.services.cart.getUserCart(req.authorisation?.id)
        .then(cart => {
            //console.log(cart);
            const found = cart.content.find(cartContentItem => {
                return cartContentItem.item.itemId === data.itemId //Ovde prikazuje da je content prazan, a to nije dobro, verovatno zbog gresaka oko Item komponente
            })
            //console.log("Found: " + found);
            if(found){
                this.services.cart.editCartContentItemQuantity(cart.cartId, found.item.itemId, found.quantity + data.quantity)
                .then(cart => {
                    return res.send(cart);
                })
                .catch(error => {
                    throw error;
                })
            }else{
                this.services.cart.addCartContentItem(cart.cartId, data.itemId, data.quantity)
                .then(cart => {
                    return res.send(cart);
                })
                .catch(error => {
                    throw error;
                })
            }
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);  
          });
    }

    editInCart(req: Request, res: Response){

    }

    makeOrder(req: Request, res: Response){

    }
} 