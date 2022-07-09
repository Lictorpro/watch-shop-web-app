import IModel from '../../common/IModel.interface';
import BandTypeModel from '../band-type/BandTypeModel.model';
import CategoryModel from '../category/CategoryModel.model';

class ItemModel implements IModel{
  itemId: number;
  name: string;
  imagePath: string;
  description: string;
  //display_type: string;
  hasStopwatch: boolean;
  hasSubdial: boolean;
  hasAlarm: boolean;
  hasAutomaticCalibration: boolean;
  bandTypeId: number;
  price: number;
  //movementType: string;

  //veza ka band typeu
  bandType?: BandTypeModel = null;

  categories?: CategoryModel[] = [];

  //videcemo za price


}

export default ItemModel;
