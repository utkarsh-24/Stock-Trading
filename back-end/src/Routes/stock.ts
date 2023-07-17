import { Router } from "express"
import stocks from "../controllers/stock";

const router = Router();

router.get("/", stocks.get)

export default router