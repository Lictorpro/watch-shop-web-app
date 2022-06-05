import IModel from '../../common/IModel.interface';
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
  //movementType: string;
  bandTypeId: number;
}

export default ItemModel;
