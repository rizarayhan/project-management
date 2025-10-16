import { Router } from "express";
import { cancelInvitation, confirmInvitation, getSentInvitation, myInvitations, sendInvitation } from "../controllers/invitationController.js";

const route = Router();

route.get("/:projectId/get-sent-invitation", getSentInvitation);
route.delete("/:invitationId/cancel-invitation", cancelInvitation);
route.post("/send", sendInvitation);
route.get("/my-invitations", myInvitations);
route.post("/confirm", confirmInvitation);

export default route;
