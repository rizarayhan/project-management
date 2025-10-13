import { Router } from "express";
import { register } from "../controllers/authenticationController.js";

const route = Router();

route.post("/register", register);

export default route;
