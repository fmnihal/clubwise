import { Router } from "express";
import AuthRouteHandler from "../controllers/auth";
import { Middleware } from "../libs/middleware";

const authRoutes = Router();

authRoutes.get("/verify-admin", Middleware.verifyAdmin, AuthRouteHandler.verifyAdmin);
authRoutes.get("/verify-student", Middleware.verifyUserRoute, AuthRouteHandler.verifyUser)
authRoutes.post("/login", Middleware.validateLogin, AuthRouteHandler.login);
authRoutes.post("/signup", Middleware.validateSignup, AuthRouteHandler.signUp);

export default authRoutes;