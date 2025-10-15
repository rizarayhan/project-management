import { createProjectValidation, updateProjectValidation } from "../validations/projectValidation.js";
import { formatJoiErrors } from "../utils/formatJoiErrors.js";
import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  // validation
  const { error } = createProjectValidation.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = formatJoiErrors(error);
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  // create
  try {
    const { title, description, dueDate, tags, priority } = req.body;
    const project = await Project.create({
      title,
      description,
      dueDate,
      tags,
      priority,
      owner: req.user._id,
      collaborators: [req.user._id],
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  // validation
  const { error } = updateProjectValidation.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = formatJoiErrors(error);
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  // create
  try {
    const { projectId, title, description, dueDate, tags, priority } = req.body;
    const project = await Project.findByIdAndUpdate(projectId, {
      title,
      description,
      dueDate,
      tags,
      priority,
      owner: req.user._id,
      collaborators: [req.user._id],
    });

    res.status(201).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Project fetch successfully",
      projects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "You are not authorized to delete this project" });
    }

    // delete all jobs

    await project.deleteOne();

    res.status(201).json({
      message: "Project deleted successfully",
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
