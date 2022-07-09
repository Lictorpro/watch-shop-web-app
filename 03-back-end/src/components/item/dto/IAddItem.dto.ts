import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export interface IAddItemDto{
    name: string;
    imagePath: string;
    description: string;
    displayType: string;
    movementType: string;
    price: number;
    categoryIds: number[]; // Treba dodati i price
}

export default interface IAddItem extends IServiceData{
    name: string;
    image_path: string;
    description: string;
    display_type: string;
    movement_type: string;
    price: number;
    band_type: number;
}

export interface ICategoryItem extends IServiceData{
    item_id: number;
    category_id: number;
}  

const AddItemSchema = {
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
         categoryIds:{
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
        "price"
    ],
    additionalProperties: false,
};

const AddItemValidator = ajv.compile(AddItemSchema);

export { AddItemValidator };