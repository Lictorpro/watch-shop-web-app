import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export default interface IAddBandType extends IServiceData {
    name: string;
}

const AddBandTypeSchema = {
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

const AddBandTypeValidator = ajv.compile(AddBandTypeSchema);

export { AddBandTypeValidator };