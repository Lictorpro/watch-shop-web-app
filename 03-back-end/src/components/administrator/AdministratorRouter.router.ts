import AdministratorController from "./AdministratorController.controller";
import * as express from "express";
import IApplicationResources from "../../common/IAplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import AuthMiddleware from '../../middlewares/AuthMiddleware';

class AdministratorRouter implements IRouter {
  public setupRoutes(
    application: express.Application,
    resources: IApplicationResources
  ) {
    const administratorController: AdministratorController =
      new AdministratorController(resources.services);

    application.get(
      "/api/administrator",
      AuthMiddleware.getVerifier("administrator"), administratorController.getAll.bind(administratorController)
    );
    application.get(
      "/api/administrator/:id",
      AuthMiddleware.getVerifier("administrator"), administratorController.getById.bind(administratorController)
    );
    application.post(
        "/api/administrator",
        AuthMiddleware.getVerifier("administrator"), administratorController.add.bind(administratorController)
      );
      application.put(
        "/api/administrator/:id",
        AuthMiddleware.getVerifier("administrator"), administratorController.editById.bind(administratorController)
      );
  }
}

export default AdministratorRouter;
