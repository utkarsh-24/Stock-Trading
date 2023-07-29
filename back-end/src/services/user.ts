import ErrorHandler from "../middleware/errorhandler"
import User from "../Models/User"
import jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"
import { ObjectId } from 'mongodb';
import { UserEntity, UserLoginEntity, UserTokenEntity } from "../Entities/UserEntity"


const addUser = async (data: UserEntity) => {
    const { email } = data;
    let user = await User.findOne({ email });
    if (user) {
        throw new ErrorHandler("user already exist", 409)
    }
    user = new User(data)
    await user.validate()
    const result = await user.save();
    return { success: true, message: "user created successfully" };
}


const login = async (body: UserLoginEntity) => {
    const { email, password } = body
    const user = await User.findOne({ email })
    if (user) {
        if (user.password == password) {
            let token = generateUserToken({ name: user.name, userId: user._id as unknown as string })
            return { success: true, message: "successfully logined", token: token }
        }
        throw new ErrorHandler("Incorrect password", 400)
    } else {
        throw new ErrorHandler("user not found", 404)
    }
}

const generateUserToken = (details: UserTokenEntity): string => {
    const privateKeyPath = path.join(__dirname, "../keys/private.key.pem");
    const privateKeyPem = fs.readFileSync(privateKeyPath, 'utf8');
    const token = jwt.sign(details, privateKeyPem, { algorithm: 'RS256' });
    return token;
}


const getUserById = async (userId: string | ObjectId) => {
    const user = await User.findById(userId)
    if (user) {
        return user;
    } else {
        throw new ErrorHandler("user not found", 404)
    }
}

export default { addUser, login, getUserById }