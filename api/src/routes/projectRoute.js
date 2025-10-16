import { Router } from "express";
import { createProject, deleteCollaborator, deleteProject, getAllProjects, getProjectById, updateProject } from "../controllers/projectController.js";

const route = Router();

route.get("/", getAllProjects);
route.post("/", createProject);
route.put("/:projectId/update", updateProject);
route.delete("/:id/delete", deleteProject);
route.get("/:projectId", getProjectById);
route.delete("/:projectId/delete-collaborator", deleteCollaborator);

export default route;
