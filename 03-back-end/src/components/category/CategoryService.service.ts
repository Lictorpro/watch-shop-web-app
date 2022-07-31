import CategoryModel from "./CategoryModel.model";
import IAddCategory from "./dto/IAddCategory.dto";
import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import IEditCategory from "./dto/IEditCategory.dto";

interface ICategoryAdapterOptions extends IAdapterOptions { }

interface ItemCategoryInterface {
  category_item_id: number;
  item_id: number;
  category_id: number;
}

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

    category.categoryId = +data?.category_id;
    category.name = data?.name;

    return category;
  }

  public async add(data: IAddCategory): Promise<CategoryModel> {
    return this.baseAdd(data, DefaultCategoryAdapterOptions);
  }

  public async editById(
    categoryId: number,
    data: IEditCategory,
    options: ICategoryAdapterOptions = DefaultCategoryAdapterOptions
  ): Promise<CategoryModel> {
    return this.baseEditById(categoryId, data, options);
  }

  public async getAllByItemId(ItemId: number, options: ICategoryAdapterOptions = {}): Promise<CategoryModel[]> {
    return new Promise((resolve, reject) => {
      this.getAllFromTableByFieldNameAndValue<ItemCategoryInterface>("category_item", "item_id", ItemId).then(async result => {
        const categoryIds = result.map(ci => ci.category_id);

        const categories: CategoryModel[] = [];

        for (let categoryId of categoryIds) {
          const category = await this.getById(categoryId, options)
          categories.push(category);
        }

        resolve(categories);

      }).catch(error => {
        reject(error);
      });
    })

  }
}

export default CategoryService;
export { DefaultCategoryAdapterOptions };
