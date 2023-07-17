import express, { Request, Response, NextFunction } from "express";
import { PORT } from "./setup";
import "./db"
import logger from "./logger";
import stockRoutes from "./Routes/stock"
import userRoutes from "./Routes/user"
import watchlistRoutes from "./Routes/watchlist"
import cors from "cors"
import helmet from "helmet"
import ErrorHandler from "./middleware/errorhandler";
import MiddlerWare from "./middleware/requesthandler";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());


process.on("uncaughtException", (ex) => {
    logger.error(ex);
})

process.on("unhandledRejection", (ex) => {
    logger.error(ex)
})

app.use(MiddlerWare.beforeHandleRequest);

app.use("/stock", stockRoutes);
app.use("/user", userRoutes);
app.use("/watchlist", watchlistRoutes);
app.use((req, res) => {
    return res.status(404).send("Page Not Found")
})
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    return res.status(err.statusCode).send({ success: false, message: err.message })
})


app.listen(PORT, () => {
    logger.info("Server listening on port = " + PORT)
    console.log("Server listening on port = " + PORT)
})