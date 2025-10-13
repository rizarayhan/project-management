import User from "../models/User.js";
import { formatJoiErrors } from "../utils/formatJoiErrors.js";
import { registerValidation } from "../validations/authenticationValidation.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  //validation
  const { error } = registerValidation.validate(req.body, { abortEarly: false });

  if (error) {
    //mapping error
    const errors = formatJoiErrors(error);
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  try {
    const { name, email, password } = req.body;

    // check email existing
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exist",
      });
    }

    //for new user
    const user = new User({ name, email, password });
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    await user.save();

    return res.status(201).json({
      message: "User created successfully, Please wait you are being redirected to login page",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
