import CategoryService, {
  DefaultCategoryAdapterOptions,
} from "./CategoryService.service";
import { Request, Response } from "express";
import { AddCategoryValidator } from "./dto/IAddCategory.dto";
import IAddCategory from "./dto/IAddCategory.dto";
import BaseController from "../../common/BaseController";
import IEditCategory, {
  EditCategoryValidator,
  IEditCategoryDto,
} from "./dto/IEditCategory.dto";

class CategoryController extends BaseController {
  async getAll(req: Request, res: Response) {
    console.log("Test da li oce ista da se ispise u konzolu");
    if(req.authorisation?.role === "administrator"){
      return res.send([
        "test for " + req.authorisation?.identity
      ]);
    }

    this.services.category
      .getAll(DefaultCategoryAdapterOptions)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error?.message);
      });
  }

  async getById(req: Request, res: Response) {
    const id: number = +req.params?.id;

    this.services.category
      .getById(id, DefaultCategoryAdapterOptions)
      .then((result) => {
        if (result === null) {
          return res.sendStatus(404);
        }
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error?.message);
      });
  }

  async add(req: Request, res: Response) {
    const data = req.body as IAddCategory;

    if (!AddCategoryValidator(data)) {
      return res.status(400).send(AddCategoryValidator.errors);
    }

    this.services.category
      .add(data)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(400).send(error?.message);
      });
  }

  async edit(req: Request, res: Response) {
    const id: number = +req.params?.id;

    const data = req.body as IEditCategoryDto;

    if (!EditCategoryValidator(data)) {
      return res.status(400).send(EditCategoryValidator.errors);
    }

    this.services.category
      .getById(id, DefaultCategoryAdapterOptions)
      .then((result) => {
        if (result === null) {
          return res.sendStatus(404);
        }
        this.services.category
          .editById(id, {
            name: data.name,
          })
          .then((result) => {
            res.send(result);
          })
          .catch((error) => {
            res.status(500).send(error?.message);
          });
      })
      .catch((error) => {
        res.status(500).send(error?.message);
      });
  }

  async deleteCategory(req: Request, res: Response) {
    const categoryId: number = +req.params?.id;

    this.services.category
      .baseDeleteById(categoryId)
      .then((result) => {
        if (result === null) {
          return res.sendStatus(404);
        }
        res.send("This category has been deleted!");
      })
      .catch((error) => {
        res.status(500).send(error?.message);
      });
  }

  

}

export default CategoryController;
