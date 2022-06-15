import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export interface IEditItemDto{
    name: string;
    imagePath: string;
    description: string;
    displayType: string;
    movementType: string;
    isActive: boolean;
    categoryIds: number[]; // Treba dodati i price
}

export default interface IEditItem extends IServiceData{
    name: string;
    image_path: string;
    description: string;
    display_type: string;
    movement_type: string;
    is_active: number;
}

export interface ICategoryItem extends IServiceData{
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
        isActive:{
            type: "boolean"
        },
        categoryIds:{
            type: "array",
            minItems: 0,
            uniqueItems: true,
            items: {
                type: "integer"
            }
        }
    },
    required: [
        "name",
        "imagePath",
        "description",
        "displayType",
        "movementType",
        "categoryIds",
        "isActive"
    ],
    additionalProperties: false,
};

const EditItemValidator = ajv.compile(EditItemSchema);

export { EditItemValidator };