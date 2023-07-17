import { Request, Response } from "express"
import stockServices from "../services/stock"


const get = async (req: Request, res: Response) => {
    let result = await stockServices.fetchStocks()
    return res.send(result);
}

export default { get }