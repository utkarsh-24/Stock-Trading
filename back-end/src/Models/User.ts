import mongoose, { Schema } from "mongoose";
import { UserEntity } from "../Entities/UserEntity";

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

export default mongoose.model<UserEntity>("user", userSchema)