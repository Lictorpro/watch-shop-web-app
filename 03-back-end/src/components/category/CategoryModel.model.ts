import IModel from '../../common/IModel.interface';

export interface IItemCategory {
  category_item_id: number;
  category_id: number;
  item_id: number;
} // trebao bi da napravi ovo za sledeci cas
class CategoryModel implements IModel{
  categoryId: number;
  name: string;
}
export default CategoryModel;
