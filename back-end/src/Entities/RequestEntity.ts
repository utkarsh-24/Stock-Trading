import { UserEntity } from "./UserEntity";
import { Request } from "express";

export interface CustomRequestEntity extends Request {
    user?: UserEntity;
}