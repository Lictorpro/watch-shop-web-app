import IModel from '../../common/IModel.interface';
import BandTypeModel from '../band-type/BandTypeModel.model';
import CategoryModel from '../category/CategoryModel.model';

class ItemModel implements IModel {
  itemId: number;
  name: string;
  imagePath: string;
  description: string;
  displayType: "analog" | "digital";
  hasStopwatch: boolean;
  hasSubdial: boolean;
  hasAlarm: boolean;
  hasAutomaticCalibration: boolean;
  bandTypeId: number;
  price: number;
  movementType: "automatic" | "mechanical" | "quartz";

  //veza ka band typeu
  bandType?: BandTypeModel = null;

  categories?: CategoryModel[] = [];



}

export default ItemModel;
