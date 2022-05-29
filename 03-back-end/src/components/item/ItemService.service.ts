import ItemModel from "./ItemModel.model";
import * as mysql2 from "mysql2/promise";
import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";

class ItemAdapterOptions implements IAdapterOptions {}

class ItemService extends BaseService<ItemModel, ItemAdapterOptions> {
  tableName(): string {
    return "item";
  }

  protected async adaptToModel(data: any): Promise<ItemModel> {
    const item: ItemModel = new ItemModel();

    item.itemId = +data?.item_id; //ovde pisemo imena kolona iz tabele u bazi
    item.name = data?.name;
    item.imagePath = data?.image_path;
    item.description = data?.description;
    item.hasStopwatch = +data?.has_stopwatch;
    item.hasSubdial = +data?.has_subdial;
    item.hasAlarm = +data?.has_alarm;
    item.hasAutomaticCalibration = +data?.has_automatic_calibration;
    item.bandTypeId = +data?.band_type_id;

    return item;
  }

  public async getAllByBandTypeId(bandTypeId: number, options: ItemAdapterOptions): Promise<ItemModel[]> {
    return this.getAllByFieldNameAndValue('band_type_id', bandTypeId, options);
  }
}

export default ItemService;
