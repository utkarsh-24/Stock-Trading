import mongoose from "mongoose";
import logger from "./logger";

const db = async () => {
    let mongoUrl = process.env.DB_URL ?? "";
    let mongoDb = process.env.DB_NAME;
    await mongoose.connect(mongoUrl, { dbName: mongoDb })
        .then(() => {
            logger.info("DB connected successfully");
        })
        .catch((err) => {
            console.log(err)
            logger.error("Trouble in connecting to DB");
            logger.error(err)
            process.exit(1);
        })
}

db();