import CategoryService from "./CategoryService.service";
import CategoryController from "./CategoryController.controller";
import * as express from "express";
import IApplicationResources from "../../common/IAplicationResources.interface";
import IRouter from "../../common/IRouter.interface";

class CategoryRouter implements IRouter {
  public setupRoutes(
    application: express.Application,
    resources: IApplicationResources
  ) {
    const categoryService: CategoryService = new CategoryService(
      resources.databaseConnection
    );
    const categoryController: CategoryController = new CategoryController(
      categoryService
    );

    application.get(
      "/api/category",
      categoryController.getAll.bind(categoryController)
    );
    application.get(
      "/api/category/:id",
      categoryController.getById.bind(categoryController)
    );
    application.put(
      "/api/category/:id",
      categoryController.edit.bind(categoryController)
    );
    application.post(
      "/api/category",
      categoryController.add.bind(categoryController)
    );
    application.delete(
      "/api/category/:id",
      categoryController.deleteCategory.bind(categoryController)
    );
  }
}

export default CategoryRouter;
