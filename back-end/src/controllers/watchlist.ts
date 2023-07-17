import { Request, Response, NextFunction } from "express"
import ErrorHandler from "../middleware/errorhandler";
import watchlist from "../services/watchlist";
import { UserEntity } from "../Entities/UserEntities";
import { CustomRequestEntity } from "../Entities/RequestEntity";
import { ObjectId } from "mongoose";
import logger from "../logger";


const add = async (req: CustomRequestEntity, res: Response, next: NextFunction) => {
    const { stockName } = req.body
    const user: UserEntity | undefined = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId: ObjectId | string = user._id ?? "";
    try {
        const result = await watchlist.addStocktoUser(userId, stockName)
        return res.send(result);
    } catch (err: any) {
        logger.error(err)
        next(new ErrorHandler(err.message, err.statusCode ?? 400))
    }
}

const remove = async (req: CustomRequestEntity, res: Response, next: NextFunction) => {
    const { stockName } = req.body
    const user: UserEntity | undefined = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId: ObjectId | string = user._id ?? "";
    try {
        const result = await watchlist.removeStockFromUser(userId, stockName)
        return res.send(result);
    } catch (err: any) {
        logger.error(err)
        next(new ErrorHandler(err.message, err.statusCode ?? 400))
    }
}

const get = async (req: CustomRequestEntity, res: Response, next: NextFunction) => {
    const user: UserEntity | undefined = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId: ObjectId | string = user._id ?? "";
    try {
        const result = await watchlist.getStockFromUser(userId)
        return res.send(result);
    } catch (err: any) {
        logger.error(err)
        next(new ErrorHandler(err.message, err.statusCode ?? 400))
    }
}

export default { add, remove, get }