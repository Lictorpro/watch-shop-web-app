import { Application } from 'express';
import IAplicationResources from '../../common/IAplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import CartController from './CartController.controller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

export default class CartRouter implements IRouter {
    setupRoutes(application: Application, resources: IAplicationResources) {
        const cartController: CartController = new CartController(resources.services);

        application.get("/api/cart", AuthMiddleware.getVerifier("user"), cartController.getCart.bind(cartController));
        application.post("/api/cart", AuthMiddleware.getVerifier("user"), cartController.addToCart.bind(cartController));
        application.put("/api/cart", AuthMiddleware.getVerifier("user"), cartController.editInCart.bind(cartController));
        application.post("/api/cart/order", AuthMiddleware.getVerifier("user"), cartController.makeOrder.bind(cartController));
        application.get("/api/order", AuthMiddleware.getVerifier("user", "administrator"), cartController.getOrders.bind(cartController));
    }

}
