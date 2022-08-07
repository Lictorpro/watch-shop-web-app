import IRouter from "../../common/IRouter.interface";
import * as express from 'express';
import IApplicationResources from "../../common/IAplicationResources.interface";
import BandTypeController from './BandTypeController.controller';
import AuthMiddleware from "../../middlewares/AuthMiddleware";

class BandTypeRouter implements IRouter {
    public setupRoutes(
        application: express.Application,
        resources: IApplicationResources
    ) {
        const bandTypeController: BandTypeController = new BandTypeController(
            resources.services
        );


        application.get(
            "/api/bandType",
            AuthMiddleware.getVerifier("administrator", "user"), bandTypeController.getAll.bind(bandTypeController)
        );
        application.get(
            "/api/bandType/:id",
            AuthMiddleware.getVerifier("administrator", "user"), bandTypeController.getById.bind(bandTypeController)
        );
        application.put(
            "/api/bandType/:id",
            AuthMiddleware.getVerifier("administrator"), bandTypeController.edit.bind(bandTypeController)
        );
        application.post(
            "/api/bandType",
            AuthMiddleware.getVerifier("administrator"), bandTypeController.add.bind(bandTypeController)
        );
    }
}
export default BandTypeRouter;