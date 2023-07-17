import { UserEntity } from "./UserEntities";
import { Request } from "express";

export interface CustomRequestEntity extends Request {
    user?: UserEntity; // Define the `user` property on the custom Request type
}