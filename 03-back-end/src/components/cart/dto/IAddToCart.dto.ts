import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export interface IAddToCartDto{
    itemId: number;
    quantity: number;
}


const AddToCartSchema = {
    type: "object",
    properties: {
        itemId: {
            type: "integer"
        },
        quantity: {
            type: "integer",
            minimum: 1
        },
    },
    required: [
        "itemId",
        "quantity",
    ],
    additionalProperties: false,
};

const AddToCartValidator = ajv.compile(AddToCartSchema);

export { AddToCartValidator };