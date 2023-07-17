import { ObjectId } from "mongoose"
import User from "../Models/User"

const addStocktoUser = async (userId: string | ObjectId, stockName: string) => {
    const result = await User.findByIdAndUpdate(userId, { $push: { stocks: stockName } }, { new: true })
    return { success: true, user: result }
}

const removeStockFromUser = async (userId: string | ObjectId, stockName: string) => {
    const result = await User.findByIdAndUpdate(userId, { $pull: { stocks: stockName } }, { new: true })
    return { success: true, user: result }
}

const getStockFromUser = async (userId: string | ObjectId) => {
    const user = await User.findById(userId)
    return { success: true, data: user?.stocks }
}

export default { addStocktoUser, removeStockFromUser, getStockFromUser }