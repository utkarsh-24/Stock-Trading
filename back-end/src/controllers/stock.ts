import { Request, Response, NextFunction } from "express"
import stockServices from "../services/stock"
import ErrorHandler from "../middleware/errorhandler";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let result = await stockServices.fetchStocks()
        return res.send(result);
    } catch (err: any) {
        next(new ErrorHandler(err.message,err.statusCode ?? 500))
    }
}

export default { get }