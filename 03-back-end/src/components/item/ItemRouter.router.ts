import IRouter from '../../common/IRouter.interface';
import * as express from 'express';
import IApplicationResources from '../../common/IAplicationResources.interface';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import ItemController from '../../components/item/ItemController.controller';
class ItemRouter implements IRouter {
    public setupRoutes(
      application: express.Application,
      resources: IApplicationResources
    ) {

      const itemController: ItemController = new ItemController(resources.services);
      
  
      application.get(
        "/api/item",
        AuthMiddleware.getVerifier("administrator", "user"), itemController.getAll.bind(itemController)
      );

    }
}

export default ItemRouter;