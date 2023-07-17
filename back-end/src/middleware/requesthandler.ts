import { Request, Response, NextFunction } from "express"
import jwt, { VerifyOptions } from 'jsonwebtoken';
import fs from 'fs'
import path from "path"
import User from "../services/user"
import { IUser } from "../Models/User";
import logger from "../logger";

interface CustomRequest extends Request {
    user?: IUser; // Define the `user` property on the custom Request type
}

interface UserPayload {
    userId: string;
    name: string;
}


const beforeHandleRequest = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const url = req.url;
    if (url == "/user/login" || url == "/user/signup") {
        next();
    } else {
        const token = req.headers.authorization?.split(' ')[1] || req.query.bearer as string;  // Assuming token is provided in the Authorization header

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        try {
            const decodedToken: UserPayload = decodeToken(token);
            const user = await User.getUserById(decodedToken.userId)
            // Do additional checks or operations based on the decoded payload if needed
            req.user = user // Store the user payload in the request object for further processing
            next();
        } catch (error) {
            logger.error(error)
            return res.status(401).json({success:false, message: 'Invalid token' });
        }
    }
}


const decodeToken = (token: string): UserPayload => {
    const publicKeyPath = path.join(__dirname, '../keys/public.key.pem');
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
    const options: VerifyOptions = { algorithms: ['RS256'] };
    const decoded = jwt.verify(token, publicKey, options) as UserPayload;
    return decoded;
}


export default { beforeHandleRequest }