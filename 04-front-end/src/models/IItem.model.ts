import IBandType from './IBandType.model';
import ICategory from './ICategory.model';
export default interface IItem{
    categories: ICategory[];
    itemId: number;
    name: string;
    imagePath: string;
    description: string;
    hasStopwatch: boolean;
    hasSubdial: boolean;
    hasAlarm: boolean;
    hasAutomaticCalibration: boolean;
    bandTypeId: number;
    price: number;
    brandType: IBandType;

}