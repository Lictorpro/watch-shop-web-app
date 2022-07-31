import { Request, Response } from "express";
import BaseController from "../../common/BaseController";
import { DevConfig } from "../../configs";
import { AddToCartValidator, IAddToCartDto } from './dto/IAddToCart.dto';
import { EditInCartValidator, IEditInCartDto } from './dto/IEditInCart.dto';
import { IMakeOrderDto, MakeOrderValidator, IAddOrder } from './dto/IMakeOrder.dto';

export default class CartController extends BaseController {

    getCart(req: Request, res: Response) {
        this.services.cart.getUserCart(req.authorisation?.id)
            .then(cart => {
                res.send(cart);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    addToCart(req: Request, res: Response) {
        const data = req.body as IAddToCartDto;

        if (!AddToCartValidator) {
            return res.status(400).send(AddToCartValidator.errors);
        }

        this.services.cart.getUserCart(req.authorisation?.id)
            .then(cart => {
                const found = cart.content.find(cartContentItem => {
                    return cartContentItem.item.itemId === data.itemId
                })
                if (found) {
                    this.services.cart.editCartContentItemQuantity(cart.cartId, found.item.itemId, found.quantity + data.quantity)
                        .then(cart => {
                            return res.send(cart);
                        })
                        .catch(error => {
                            throw error;
                        })
                } else {
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

    editInCart(req: Request, res: Response) {
        const data = req.body as IEditInCartDto;

        if (!EditInCartValidator) {
            return res.status(400).send(EditInCartValidator.errors);
        }

        this.services.cart.getUserCart(req.authorisation?.id)
            .then(cart => {
                const found = cart.content.find(cartContentItem => {
                    return cartContentItem.item.itemId === data.itemId
                })


                if (!found) {
                    return res.status(404).send("An item is not in your cart!");
                }

                if (data.quantity > 0) {
                    this.services.cart.editCartContentItemQuantity(cart.cartId, found.item.itemId, data.quantity)
                        .then(cart => {
                            return res.send(cart);
                        })
                        .catch(error => {
                            throw error;
                        })
                } else {
                    this.services.cart.deleteCartContentItem(cart.cartId, found.item.itemId)
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

    makeOrder(req: Request, res: Response) {

        this.services.cart.getUserCart(req.authorisation?.id)
            .then(cart => {

                if (cart.content.length === 0) {
                    throw {
                        status: 400,
                        message: "Your cart is empty"
                    }
                }

                const dbData: IAddOrder = {
                    cart_id: cart.cartId
                }

                return this.services.order.makeOrder(dbData)

            })
            .then(order => {
                res.send(order);
            })
            .catch(error => {
                res.status(error?.status ?? 500).send(error?.message);
            })

    }

    public async getOrders(req: Request, res: Response) {
        if (DevConfig.auth.allowAllRoutesWithoutAuthTokens || req.authorisation?.role === "administrator") {
            this.services.order.getAll({ loadCartData: true })
                .then(orders => {
                    res.send(orders);
                })
                .catch(error => {
                    res.status(error?.status ?? 500).send(error?.message);
                })
        } else {
            this.services.order.getAllByUserId(req.authorisation?.id)
                .then(orders => {
                    res.send(orders);
                })
                .catch(error => {
                    res.status(error?.status ?? 500).send(error?.message);
                })
        }


    }
} 