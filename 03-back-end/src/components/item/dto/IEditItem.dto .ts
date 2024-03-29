import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export interface IEditItemDto {
    name: string;
    imagePath: string;
    description: string;
    displayType: string;
    movementType: string;
    isActive: boolean;
    price: number;
    categoryIds: number[];
}

export default interface IEditItem extends IServiceData {
    name: string;
    image_path: string;
    description: string;
    display_type: string;
    movement_type: string;
    price: number;
    is_active: number;
}

export interface ICategoryItem extends IServiceData {
    item_id: number;
    category_id: number;
}

const EditItemSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 4,
            maxLength: 128
        },
        imagePath: {
            type: "string",
            minLength: 4,
            maxLength: 128
        },
        description: {
            type: "string",
            minLength: 4,
            maxLength: 255
        },
        isActive: {
            type: "boolean"
        },
        categoryIds: {
            type: "array",
            minItems: 0,
            uniqueItems: true,
            items: {
                type: "integer"
            }
        },
        price: {
            type: "number",
            multipleOf: 0.01
        }
    },
    required: [
        "name",
        "imagePath",
        "description",
        "displayType",
        "movementType",
        "categoryIds",
        "isActive",
        "price"
    ],
    additionalProperties: false,
};

const EditItemValidator = ajv.compile(EditItemSchema);

export { EditItemValidator };