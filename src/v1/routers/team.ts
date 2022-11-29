import { Router } from "express";
import {
  addGame,
  createTeam,
  getTeam,
  getLastGame,
  getGameById,
  getGameByDate,
  getTeamThatScoredTheMostGoals,
  gamesByDateRange,
  getPointsByDateRange,
} from "../../controllers/team";
import { body, param } from "express-validator";
import { validateField } from "../../middlewares/validateresult";
import { idTeam, nameTeamExists } from "../../utils/dbValidations";
import { validateDate } from "../../utils/validations";
import { hasRol } from "../../middlewares/validateRol";
import { validateJwt } from "../../middlewares/validateJwt";

const app = Router();

app
  .get("/", [validateJwt, hasRol("USER", "ADMIN")], getTeam)

  .get(
    "/:id",
    [
      validateJwt,
      hasRol("USER", "ADMIN"),
      param("id", "Enter a valid id").isMongoId().custom(idTeam),
      validateField,
    ],
    getGameById
  )

  .get(
    "/last-game/:id",
    [
      validateJwt,
      hasRol("USER", "ADMIN"),
      param("id", "Enter a valid id").isMongoId().custom(idTeam),
      validateField,
    ],
    getLastGame
  )

  .get(
    "/search-by-date/:id",
    [
      validateJwt,
      hasRol("USER", "ADMIN"),
      param("id", "Enter a valid Id").notEmpty().custom(idTeam),
      body("date").custom(validateDate),
      body("date", "Enter a valid date example: YYYY-MM-DD")
        .notEmpty()
        .isDate({ format: "YYYY-MM-DD", strictMode: true }),
      validateField,
    ],
    getGameByDate
  )

  .get(
    "/team-that-scored-more-goals/:id",
    [
      validateJwt,
      hasRol("USER", "ADMIN"),
      param("id", "Enter a valid id").isMongoId().custom(idTeam),
      validateField,
    ],
    getTeamThatScoredTheMostGoals
  )

  .get(
    "/games-by-date-range/:id",
    [
      validateJwt,
      hasRol("USER", "ADMIN"),
      param("id", "Enter a Valid id").custom(idTeam),
      body("from").custom(validateDate),
      body(["from", "to"], "Enter a valid date example: YYYY-MM-DD")
        .notEmpty()
        .isDate({ format: "YYYY-MM-DD", strictMode: true }),
      validateField,
    ],
    gamesByDateRange
  )

  .get(
    "/points-by-date-range/:id",
    [
      validateJwt,
      hasRol("USER", "ADMIN"),
      param("id", "Enter a Valid id").custom(idTeam),
      body("from").custom(validateDate),
      body(["from", "to"], "Enter a valid date example: YYYY-MM-DD")
        .notEmpty()
        .isDate({ format: "YYYY-MM-DD", strictMode: true }),
      validateField,
    ],
    getPointsByDateRange
  )

  .post(
    "/",
    [
      validateJwt,
      hasRol("USER", "ADMIN"),
      body("name", "Enter a name").notEmpty().custom(nameTeamExists),
      body("rival", "Enter a rival").notEmpty(),
      body("goalsConceded", "Enter a value").isNumeric().notEmpty(),
      body("goalsScored", "Enter a value").isNumeric().notEmpty(),
      body("date").custom(validateDate),
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
      validateJwt,
      hasRol("USER", "ADMIN"),
      param("id", "Enter a valid id").isMongoId().custom(idTeam),
      body("rival", "Enter a rival").notEmpty(),
      body("goalsConceded", "Enter a value").isNumeric().notEmpty(),
      body("goalsScored", "Enter a value").isNumeric().notEmpty(),
      body("date").custom(validateDate),
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
