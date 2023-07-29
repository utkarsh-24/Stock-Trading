import { Router } from "express"
import user from "../controllers/user"

const routes = Router();

routes.post("/login", user.login)
routes.post("/signup", user.signup)

export default routes;