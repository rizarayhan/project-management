import { Router } from "express";
import authenticationRoute from "./authenticationRoute.js";
import tagsRoute from "./tagsRoute.js";
import jobsRoute from "./jobsRoute.js";
import projectRoute from "./projectRoute.js";
import invitationRoute from "./invitationRoute.js";
import { verifyToken } from "../middleware/verifyToken.js";

const route = Router();

route.use("/auth", authenticationRoute);
route.use("/tags", tagsRoute);
route.use("/projects", verifyToken, projectRoute);
route.use("/jobs", verifyToken, jobsRoute);
route.use("/invitation", verifyToken, invitationRoute);

export default route;
