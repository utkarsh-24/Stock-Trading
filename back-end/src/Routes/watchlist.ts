import { Router } from "express"
import watchlist from "../controllers/watchlist"

const routes = Router();

routes.post("/", watchlist.add);
routes.delete("/", watchlist.remove);
routes.get("/",watchlist.get)
export default routes;