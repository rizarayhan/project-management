import Invitation from "../models/Invitation.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { formatJoiErrors } from "../utils/formatJoiErrors.js";
import { sendInvitationValidation } from "../validations/invitationValidation.js";

export const sendInvitation = async (req, res) => {
  const { email, projectId } = req.body;

  const { error } = sendInvitationValidation.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = formatJoiErrors(error);
    return res.status(400).json({
      message: "Validation errror",
      errors,
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const existingInvitation = await Invitation.findOne({
      sender: req.user._id,
      receiver: user._id,
      project: project._id,
    });
    if (existingInvitation) {
      return res.status(400).json({ message: "Invitation already send" });
    }

    const isCollaborator = project.collaborators.includes(user._id);
    if (isCollaborator) {
      return res.status(400).json({ message: "User already a collaborator" });
    }

    const invitation = await Invitation.create({
      sender: req.user._id,
      receiver: user._id,
      project: project._id,
    });

    res.status(201).json({
      message: "Invitation sent successfully",
      invitation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getSentInvitation = async (req, res) => {
  const { projectId } = req.params;
  try {
    const invitation = await Invitation.find({
      project: projectId,
    }).populate({
      path: "receiver",
      select: "name email",
    });

    res.status(200).json({
      message: "Invitation fetch successfully",
      invitation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const cancelInvitation = async (req, res) => {
  const { invitationId } = req.params;
  try {
    const invitation = await Invitation.findById(invitationId);
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    await invitation.deleteOne();
    res.status(200).json({ message: "Invitation canceled successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const myInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.find({
      receiver: req.user._id,
    }).populate([
      {
        path: "sender",
        select: "name email",
      },
      {
        path: "project",
        select: "title description dueDate -_id",
      },
    ]);
    res.status(200).json({
      message: "Invitations fetch successfully",
      invitations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
