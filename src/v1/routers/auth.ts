import { Router } from "express";
import {
  forgotPassword,
  logIn,
  resetPassword,
  signUp,
} from "../../controllers/auth";
import { body, param } from "express-validator";
import { validateField } from "../../middlewares/validateresult";
import {
  emailAlreadyExists,
  emailDoesNotExist,
} from "../../utils/dbValidations";
import { validateJwt } from "../../middlewares/validateJwt";

const app = Router();

app
  .post(
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
  )
  .post(
    "/log-in",
    [
      body(["password", "email"], "Enter an email and a password").notEmpty(),
      validateField,
    ],
    logIn
  )

  .put(
    "/forgot-password",
    [
      body("email", "Enter an email").notEmpty().isEmail(),
      body("email").custom(emailDoesNotExist),
      validateField,
    ],
    forgotPassword
  )

  .put(
    "/reset-password",
    validateJwt,
    [
      body("password", "Enter a valid password minimum 6 values maximum 14 ")
        .notEmpty()
        .isLength({ min: 6, max: 14 }),
      validateField,
    ],
    resetPassword
  );

export default app;
