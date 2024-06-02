import { Router } from "express";
import { Middleware } from "../libs/middleware";
import { createApproval } from "../controllers/clubApproval";

const clubApplyRoutes = Router();

clubApplyRoutes.post("/", Middleware.verifyUserRoute, createApproval);

export default clubApplyRoutes;