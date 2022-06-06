import IModel from '../../common/IModel.interface';
export default class PriceModel implements IModel{
    priceId: number;
    createdAt: string;
    price: number;
    itemId: number;

}