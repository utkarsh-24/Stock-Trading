import { Router } from "express"
import user from "../controllers/user"

const routes = Router();

routes.post("/login", user.login)
routes.post("/signup", user.signup)
routes.post("/watchlist", user.watchlistAdd);
routes.delete("/watchlist", user.watchlistDelete);

export default routes;