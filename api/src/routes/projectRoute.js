import { Router } from "express";
import { createProject } from "../controllers/projectController.js";

const route = Router();

route.post("/", createProject);

export default route;
