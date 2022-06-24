import AuthController from "./AuthController.controller";
import * as express from "express";
import IApplicationResources from "../../common/IAplicationResources.interface";
import IRouter from "../../common/IRouter.interface";

class AuthRouter implements IRouter {
  public setupRoutes(
    application: express.Application,
    resources: IApplicationResources
  ) {
    const authController: AuthController =
      new AuthController(resources.services);

    application.post(
      "/api/auth/administrator/login",
      authController.administratorLogin.bind(authController)
    );

    application.post(
        "/api/auth/administrator/refresh",
        authController.administratorRefresh.bind(authController)
      );
  }
}

export default AuthRouter;
