import winston from "winston";
import path from "path"
import fs from "fs"

const logger = () => {
    let logDir = path.join(__dirname, "../log");
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    const {combine,timestamp,prettyPrint} = winston.format
    return winston.createLogger({
        level: "info",
        format: combine(timestamp(),prettyPrint()),
        transports: [
            new winston.transports.File({ filename: path.join(logDir, "info.log"), level: "info" }),
            new winston.transports.File({ filename: path.join(logDir, "error.log"), level: "error" })
        ]
    })
}

export default logger();