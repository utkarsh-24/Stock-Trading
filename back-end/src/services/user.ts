import ErrorHandler from "../middleware/errorhandler"
import User, { IUser } from "../Models/User"
import jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"
import { ObjectId } from 'mongodb';

interface UserTokenDetails {
    userId: string;
    name: String;
}

interface UserLogin {
    email: string,
    password: string
}



const addUser = async (data: IUser) => {
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


const login = async (body: UserLogin) => {
    const { email, password } = body
    const user = await User.findOne({ email })
    if (user) {
        if (user.password == password) {
            let token = generateUserToken({ name: user.name, userId: user._id as string })
            return { success: true, message: "successfully logined", token: token }
        }
        throw new ErrorHandler("Incorrect password", 400)
    } else {
        throw new ErrorHandler("user not found", 404)
    }
}

const generateUserToken = (details: UserTokenDetails): string => {
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