import { Router } from "express";
import { getJobs } from "../controllers/jobsController.js";

const route = Router();

route.get("/:projectId/get-jobs", getJobs);

export default route;
