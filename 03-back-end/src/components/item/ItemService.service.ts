import ItemModel from "./ItemModel.model";
import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import IAddItem from './dto/IAddItem.dto';
import { ICategoryItem } from './dto/IAddItem.dto';
import IEditItem from './dto/IEditItem.dto ';

export interface ItemAdapterOptions extends IAdapterOptions {
  loadCategory: boolean;
  loadBandType: boolean;
  hideInactiveCategories: boolean;
}

export class  DefaultItemAdapterOptions implements ItemAdapterOptions{
  loadCategory: false;
  loadBandType: false;
  hideInactiveCategories: true;
}

interface CategoryItem{
  category_item_id: number;
  item_id: number;
  category_id: number;
}

export default class ItemService extends BaseService<
  ItemModel,
  ItemAdapterOptions
> {
  tableName(): string {
    return "item";
  }

  protected async adaptToModel(
    data: any,
    options: ItemAdapterOptions
  ): Promise<ItemModel> {
    return new Promise(async (resolve) => {
      const item: ItemModel = new ItemModel();

      item.itemId = +data?.item_id; //ovde pisemo imena kolona iz tabele u bazi
      item.name = data?.name;
      item.imagePath = data?.image_path;
      item.description = data?.description;
      item.hasStopwatch = +data?.has_stopwatch === 1;
      item.hasSubdial = +data?.has_subdial === 1;
      item.hasAlarm = +data?.has_alarm === 1;
      item.hasAutomaticCalibration = +data?.has_automatic_calibration === 1;
      item.bandTypeId = +data?.band_type_id;

      console.log( "Opcije za band type" + options.loadBandType);
      if (options.loadBandType) {

        console.log("Band Type ID: " + item.bandTypeId);
        item.bandType = await this.services.bandType.getById(item.bandTypeId, {
          loadItems: false,
        });
      }

      if (options.loadCategory) {
        item.categories = await this.services.category.getAllByItemId(item.itemId, {});
      }

      //Ovde treba dodati logiku za hide kategorija kada budemo vidjeli kako sve treba lepo da radi

      resolve(item);
    });

  }

  public async getAllByBandTypeId(
    bandTypeId: number,
    options: ItemAdapterOptions
  ): Promise<ItemModel[]> {
    return this.getAllByFieldNameAndValue("band_type_id", bandTypeId, options);
  }

   public async getAllByCategoryId(categoryId: number, options: ItemAdapterOptions): Promise<ItemModel[]>{
    return new Promise((resolve, reject) => {
      this.getAllFromTableByFieldNameAndValue<CategoryItem>("category_item", "category_id", categoryId)
      .then(async result => {
        const itemIds = result.map(ii => ii.item_id);
        const items: ItemModel[] = [];

        for(let itemId of itemIds){
          const item = await this.getById(itemId, options);
          items.push(item);
        }

        resolve(items);
      })
      .catch(error => {
        reject(error);
      })
    }) 
   }

   async add(data: IAddItem): Promise<ItemModel>{
    return this.baseAdd(data, {
      loadBandType: false,
      loadCategory: false,
      hideInactiveCategories: true
    })
   }

   async edit(itemId: number, data: IEditItem, options: ItemAdapterOptions): Promise<ItemModel>{
    return this.baseEditById(itemId, data, options);
   }

   async addItemCategory(data: ICategoryItem): Promise<number>{
    return new Promise((resolve, reject) => {
      const sql: string = "INSERT category_item SET item_id = ?, category_id =?;";

     this.db
        .execute(sql, [data.item_id, data.category_id])
        .then(async (result) => {
          const info: any = result;

          const newItemCategoryId = +(info[0]?.insertId);

          resolve(newItemCategoryId);
        })
        .catch((error) => {
          reject(error);
        });
    })
     
   }

   async deleteItemCategory(data: ICategoryItem): Promise<number>{
    return new Promise((resolve, reject) => {
      const sql: string = "DELETE FROM category_item WHERE item_id = ? AND category_id =?;";

     this.db
        .execute(sql, [data.item_id, data.category_id])
        .then(async (result) => {
          const info: any = result;

          const newItemCategoryId = +(info[0]?.affectedRows);

          resolve(newItemCategoryId);
        })
        .catch((error) => {
          reject(error);
        });
    })
     
   }

   
}
