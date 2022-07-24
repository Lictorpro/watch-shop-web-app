import IItem from './IItem.model';
interface ICartContent {
    item: IItem;
    quantity: number;
}

export default interface ICart {
    cartId: number;
    userId: number;
    createdAt: string;

    content: ICartContent[];

    isUsed: boolean;
}