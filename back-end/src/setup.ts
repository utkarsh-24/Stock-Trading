import dotenv from "dotenv"
import fs from "fs"
import path from "path"

const NODE_ENV = process.env.NODE_ENV;

const setupEnv = () => {
    let envPath = path.join(__dirname, "../");
    dotenv.config();
    if(NODE_ENV=="development")
    {
        if(fs.existsSync(path.join(envPath,"development.env")))
        {
            dotenv.config({path:path.join(envPath,"development.env"),override:true})
        }
    }
    if(NODE_ENV == "production")
    {
        if(fs.existsSync(path.join(envPath,"production.env")))
        {
            dotenv.config({path:path.join(envPath,"production.env"),override:true})
        }
    }
}

setupEnv();

const PORT = process.env.PORT ?? "3000";



export { PORT }