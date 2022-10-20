import { Router, Request, Response } from "express";
import { createTeam, getTeam } from "../../controllers/team";
import { body } from "express-validator";
import { validateField } from "../../middlewares/validateresult";
import { nameTeamExists } from "../../utils/dbValidations";
const app = Router();

app
  .get("/", getTeam)
  .post(
    "/",
    [
      body("name", "Enter a name").notEmpty().custom(nameTeamExists),
      body("rival", "Enter a rival").notEmpty(),
      body("goalsConceded", "Enter a value").isNumeric().notEmpty(),
      body("goalsScored", "Enter a value").isNumeric().notEmpty(),
      body("date", "Enter a date").isDate().notEmpty(),
      body("points", "Enter points").isNumeric().notEmpty(),

      validateField,
    ],
    createTeam
  );

export default app;
