import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    stocks:Array<string>
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    stocks: {
        type:Array,
        default:[]
    }
})

export default mongoose.model<IUser>("user", userSchema)