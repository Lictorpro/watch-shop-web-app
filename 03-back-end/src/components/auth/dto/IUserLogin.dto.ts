import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();

export interface IUserLoginDto{
    email: string;
    password: string;

}

const UserLoginSchema = {
  type: "object",
  properties: {
    email: {
        type: "string",
        format: "email"
    },
    password:{
        type: "string",
        pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
    }
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const UserLoginValidator = ajv.compile(UserLoginSchema);

export { UserLoginValidator };
