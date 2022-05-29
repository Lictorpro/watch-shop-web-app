import IModel from '../../common/IModel.interface';
class ItemModel implements IModel{
  itemId: number;
  name: string;
  imagePath: string;
  description: string;
  //display_type: string;
  hasStopwatch: number;
  hasSubdial: number;
  hasAlarm: number;
  hasAutomaticCalibration: number;
  //movementType: string;
  bandTypeId: number;
}

export default ItemModel;
