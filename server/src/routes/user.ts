import { Router } from "express";
import UserRouteHandler from "../controllers/userinfo";
import { Middleware } from "../libs/middleware";

const userRoutes = Router();
const handler = new UserRouteHandler();

userRoutes.put("/", Middleware.verifyUserRoute, handler.update);
userRoutes.delete("/", Middleware.verifyUserRoute, handler.delete);
// Admin use
// userRoutes.put("/:email", handler.updatebyAdmin);

export default userRoutes;