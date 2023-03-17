import { Router } from "express";
import carController  from "../modules/cars/controllers/carController";

const carRoutes = Router();

carRoutes.post("/", new carController().createCar);
carRoutes.get("/", new carController().getCars);
carRoutes.put("/edit/:id", new carController().editCar);
carRoutes.delete("/del/:id", new carController().deleteCar);

export default carRoutes;