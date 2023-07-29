import dotenv from "dotenv"
import fs from "fs"
import path from "path"

const NODE_ENV = process.env.NODE_ENV;

const setupEnv = () => {
    let envPath = path.join(__dirname, "../");
    dotenv.config();
    if(NODE_ENV=="development")
    {
        if(fs.existsSync(path.join(envPath,".env.development.local")))
        {
            dotenv.config({path:path.join(envPath,".env.development.local"),override:true})
        }
    }
    if(NODE_ENV == "production")
    {
        if(fs.existsSync(path.join(envPath,".env.production.local")))
        {
            dotenv.config({path:path.join(envPath,".env.production.local"),override:true})
        }
    }
}

setupEnv();

const PORT = process.env.PORT ?? "3000";

export { PORT }