import CategoryModel from "./CategoryModel.model";
import * as mysql2 from "mysql2/promise";
import IAddCategory from "./dto/IAddCategory.dto";
import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";

interface ICategoryAdapterOptions extends IAdapterOptions {}

const DefaultCategoryAdapterOptions: ICategoryAdapterOptions = {};

class CategoryService extends BaseService<
  CategoryModel,
  ICategoryAdapterOptions
> {
  tableName(): string {
    return "category";
  }

  protected async adaptToModel(data: any): Promise<CategoryModel> {
    const category: CategoryModel = new CategoryModel();

    category.categoryId = +data?.category_id; //ovde pisemo imena kolona iz tabele u bazi
    category.name = data?.name;

    return category;
  }

  public async add(data: IAddCategory): Promise<CategoryModel> {
    return new Promise<CategoryModel>((resolve, reject) => {
      const sql: string = "INSERT `category` SET `name` = ?;";

      this.db
        .execute(sql, [data.name])
        .then(async (result) => {
          const info: any = result;

          const newCategoryId = +info[0]?.insertId;

          const newCategory: CategoryModel | null = await this.getById(
            newCategoryId,
            DefaultCategoryAdapterOptions
          );

          if (newCategory === null) {
            return reject({ message: "Dublicate category name!" });
          }

          resolve(newCategory);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default CategoryService;
export { DefaultCategoryAdapterOptions };
