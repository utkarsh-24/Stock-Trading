import { ObjectId } from "mongoose";

export interface UserEntity extends Document {
    name: string,
    email: string,
    password: string,
    stocks: Array<string>,
    _id: ObjectId
}

export interface UserTokenEntity{
    userId: string;
    name: string;
}

export interface UserLoginEntity {
    email: string,
    password: string
}