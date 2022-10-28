import { Router, Request, Response } from "express";
import {
  addGame,
  createTeam,
  getTeam,
  getLastGame,
  getGameById,
} from "../../controllers/team";
import { body, param } from "express-validator";
import { validateField } from "../../middlewares/validateresult";
import { idTeam, nameTeamExists } from "../../utils/dbValidations";
const app = Router();

app
  .get("/", getTeam)

  .get(
    "/:id",
    [param("id", "Enter a valid id").isMongoId().custom(idTeam), validateField],
    getGameById
  )

  .get(
    "/last-game/:id",
    [param("id", "Enter a valid id").isMongoId().custom(idTeam), validateField],
    getLastGame
  )

  .post(
    "/",
    [
      body("name", "Enter a name").notEmpty().custom(nameTeamExists),
      body("rival", "Enter a rival").notEmpty(),
      body("goalsConceded", "Enter a value").isNumeric().notEmpty(),
      body("goalsScored", "Enter a value").isNumeric().notEmpty(),
      body("date", "Enter a valid date example: YYYY-MM-DD")
        .isDate({ format: "YYYY-MM-DD", strictMode: true })
        .notEmpty(),
      body("points", "Enter points").isNumeric().notEmpty(),

      validateField,
    ],
    createTeam
  )

  .put(
    "/add-games/:id",
    [
      param("id", "Enter a valid id").isMongoId().custom(idTeam),
      body("rival", "Enter a rival").notEmpty(),
      body("goalsConceded", "Enter a value").isNumeric().notEmpty(),
      body("goalsScored", "Enter a value").isNumeric().notEmpty(),
      body("date", "Enter a valid date example: YYYY-MM-DD")
        .isDate({
          format: "YYYY-MM-DD",
          strictMode: true,
        })
        .notEmpty(),
      body("points", "Enter points").isNumeric().notEmpty(),
      validateField,
    ],
    addGame
  );

export default app;
