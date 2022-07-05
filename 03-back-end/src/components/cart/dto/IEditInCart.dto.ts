import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export interface IEditInCartDto{
    itemId: number;
    quantity: number;
}


const EditInCartSchema = {
    type: "object",
    properties: {
        itemId: {
            type: "integer"
        },
        quantity: {
            type: "integer",
            minimum: 0
        },
    },
    required: [
        "itemId",
        "quantity",
    ],
    additionalProperties: false,
};

const EditInCartValidator = ajv.compile(EditInCartSchema);

export { EditInCartValidator };