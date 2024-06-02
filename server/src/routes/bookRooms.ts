import { Router } from "express";
import { Middleware } from "../libs/middleware";
import { bookRoom, getRooms } from "../controllers/bookRooms";

const bookRoomsRoutes = Router();

bookRoomsRoutes.post("/", Middleware.verifyAdmin, bookRoom);
bookRoomsRoutes.get("/", Middleware.verifyAdmin, getRooms);

export default bookRoomsRoutes;
