import { Request, Response, NextFunction } from "express"
import { userLoginValidator, userSignupValidator } from "../validations/user";
import user from "../services/user"
import ErrorHandler from "../middleware/errorhandler";

const login = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const valRes = await userLoginValidator.validate(body);
    if (valRes.error) {
        next(new ErrorHandler(valRes.error.details[0].message, 400))
    } else {
        try {
            const result = await user.login(body)
            return res.send(result)
        } catch (err: any) {
            next(new ErrorHandler(err.message, err.statusCode ?? 400))
        }
    }
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const valRes = await userSignupValidator.validate(body);
    if (valRes.error) {
        next(new ErrorHandler(valRes.error.details[0].message, 400))
    } else {
        try {
            const result = await user.addUser(body);
            return res.send(result)
        } catch (err: any) {
            next(new ErrorHandler(err.message, err.statusCode))
        }
    }
}

const watchlistAdd = async (req: Request, res: Response, next: NextFunction) => {
    const { stockName } = req.body
    return res.send(stockName)
}

const watchlistDelete = async (req: Request, res: Response, next: NextFunction) => {

}

export default { login, signup, watchlistDelete, watchlistAdd }