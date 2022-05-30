import CategoryService, {
  DefaultCategoryAdapterOptions,
} from "./CategoryService.service";
import { Request, Response } from "express";
import { AddCategoryValidator } from "./dto/IAddCategory.dto";
import IAddCategory from "./dto/IAddCategory.dto";
import IEditCategory, {
  EditCategoryValidator,
  IEditCategoryDto,
} from "./dto/IEditCategory.dto";

class CategoryController {
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  async getAll(req: Request, res: Response) {
    this.categoryService
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

    this.categoryService
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

    this.categoryService
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

    this.categoryService
      .getById(id, DefaultCategoryAdapterOptions)
      .then((result) => {
        if (result === null) {
          return res.sendStatus(404);
        }
        this.categoryService
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

    this.categoryService
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
