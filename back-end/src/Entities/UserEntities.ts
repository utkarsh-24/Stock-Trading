import { ObjectId } from "mongoose";

export interface UserEntity extends Document {
    name: string,
    email: string,
    password: string,
    stocks: Array<string>,
    _id: ObjectId | null
}