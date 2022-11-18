import { Router } from "express";
import { signUp } from "../../controllers/auth";
import { body, param } from "express-validator";
import { validateField } from "../../middlewares/validateresult";
import { emailAlreadyExists } from "../../utils/dbValidations";

const app = Router();

app.post(
  "/sign-up",
  [
    body("password", "Enter a valid password minimum 6 values maximum 14 ")
      .notEmpty()
      .isLength({ min: 6, max: 14 }),
    body("email", "Enter a valid email")
      .notEmpty()
      .isEmail()
      .custom(emailAlreadyExists),
    validateField,
  ],
  signUp
);

export default app;
