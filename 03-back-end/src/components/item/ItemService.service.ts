import ItemModel from "./ItemModel.model";
import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";

export interface ItemAdapterOptions extends IAdapterOptions {
  loadCatgery: false;
  loadBandType: false;
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

      if (options.loadCatgery) {
        item.bandType = await this.services.bandType.getById(item.bandTypeId, {
          loadItems: true,
        });
      }

      resolve(item);
    });
  }

  /*public async getAllByItemId(itemId: number, options: ISizeAdapterOptions): Promise<>{
    return new Promise((resolve, reject) => {
      this.getAllFromTableByFieldNameAndValue<{

      }>
    })
  }*/

  public async getAllByBandTypeId(
    bandTypeId: number,
    options: ItemAdapterOptions
  ): Promise<ItemModel[]> {
    return this.getAllByFieldNameAndValue("band_type_id", bandTypeId, options);
  }
}
