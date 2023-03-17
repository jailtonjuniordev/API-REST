import { Router } from "express";
import userController from "../modules/user/controllers/userController";
const userRoutes = Router();

userRoutes.post("/", new userController().createUser);
userRoutes.get("/", new userController().getUsers);
userRoutes.put("/edit/:id", new userController().editUser);
userRoutes.delete("/del/:id", new userController().deleteUser); 

export default userRoutes;