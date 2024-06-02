import { Router } from "express";
import { createPost } from "../controllers/post";
import { Middleware } from "../libs/middleware";

const postRoutes = Router();

postRoutes.post("/", Middleware.verifyAdmin, createPost);

export default postRoutes;