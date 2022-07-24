import { StringLiteral } from "typescript";

export default interface IUser {
    userId: number;
    email: string;
    forename: string;
    surname: string;
    activationCode: string | null;
    address: string;
    passwordHash: string | null;
    createdAt: string;
    isActive: boolean;
}