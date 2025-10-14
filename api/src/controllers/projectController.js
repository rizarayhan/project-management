import { createProjectValidation } from "../validations/projectValidation.js";
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
      message: " Project created successfully",
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
