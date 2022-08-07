import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export default interface IEditBandType extends IServiceData {
    name: string;
}

interface IEditBandTypeDto {
    name: string;
}

const EditBandTypeSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 4,
            maxLength: 64
        }
    },
    required: [
        "name",
    ],
    additionalProperties: false,
};

const EditBandTypeValidator = ajv.compile(EditBandTypeSchema);

export { EditBandTypeValidator, IEditBandTypeDto };