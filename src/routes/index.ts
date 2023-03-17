import { Router } from "express";
import userRoutes from "./user.routes";
import carRoutes from "./car.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/cars", carRoutes);

export default routes;