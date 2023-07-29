import { Request, Response, NextFunction } from "express"
import jwt, { VerifyOptions } from 'jsonwebtoken';
import fs from 'fs'
import path from "path"
import User from "../services/user"
import logger from "../logger";
import { CustomRequestEntity } from "../Entities/RequestEntity";
import { UserTokenEntity } from "../Entities/UserEntity";

const beforeHandleRequest = async (req: CustomRequestEntity, res: Response, next: NextFunction) => {
    const url = req.url;
    if (url == "/user/login" || url == "/user/signup") {
        next();
    } else {
        const token = req.headers.authorization?.split(' ')[1] || req.query.bearer as string;  // Assuming token is provided in the Authorization header

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        try {
            const decodedToken: UserTokenEntity = decodeToken(token);
            const user = await User.getUserById(decodedToken.userId)
            req.user = user
            next();
        } catch (error) {
            logger.error(error)
            return res.status(401).json({success:false, message: 'Invalid token' });
        }
    }
}


const decodeToken = (token: string): UserTokenEntity => {
    const publicKeyPath = path.join(__dirname, '../keys/public.key.pem');
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
    const options: VerifyOptions = { algorithms: ['RS256'] };
    const decoded = jwt.verify(token, publicKey, options) as UserTokenEntity;
    return decoded;
}


export default { beforeHandleRequest }