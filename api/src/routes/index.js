import { Router } from "express";
import authenticationRoute from "./authenticationRoute.js";
import tagsRoute from "./tagsRoute.js";
import projectRoute from "./projectRoute.js";
import { verifyToken } from "../middleware/verifyToken.js";

const route = Router();

route.use("/auth", authenticationRoute);
route.use("/tags", tagsRoute);
route.use("/projects", verifyToken, projectRoute);

export default route;
