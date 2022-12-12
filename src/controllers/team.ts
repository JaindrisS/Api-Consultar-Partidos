import { Response, Request, request } from "express";
import { setCache } from "../middlewares/node-cache";
import {
  createTeamService,
  getTeamService,
  addGameService,
  getLastGameService,
  getGameByIdService,
  getGameByDateService,
  getTeamThatScoredTheMostGoalsService,
  gamesByDateRangeService,
  getPointsByDateRangeService,
} from "../services/team";
import { handleHttp } from "../utils/error.handle";

export const createTeam = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, rival, goalsConceded, goalsScored, date, points } = req.body;

    const info = {
      name,
      games: [
        {
          rival,
          goalsConceded,
          goalsScored,
          date,
          points,
        },
      ],
    };

    const response = await createTeamService(info);

    return res.status(201).json({ Msg: "Team created", response });
  } catch (error) {
    return handleHttp(res, "Error when creating the team", error);
  }
};

export const getTeam = async (req: Request, res: Response) => {
  try {
    const response = await getTeamService();

    setCache(req.originalUrl, response);

    return res.status(200).json(response);
  } catch (error) {
    return handleHttp(res, "Error when obtaining the teams", error);
  }
};

export const addGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rival, goalsConceded, goalsScored, date, points } = req.body;

    const response = await addGameService(id, {
      rival,
      goalsConceded,
      goalsScored,
      date,
      points,
    });

    return res.status(201).json(`Game with rival ${rival} added`);
  } catch (error) {
    return handleHttp(res, "Error when adding game", error);
  }
};

export const getLastGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await getLastGameService(id);
    setCache(req.originalUrl, response);

    return res.status(200).json(response);
  } catch (error) {
    return handleHttp(res, "Error when obtaining the last game", error);
  }
};

export const getGameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await getGameByIdService(id);

    return res.status(200).json(response);
  } catch (error) {
    return handleHttp(res, "Error when getting the game by id", error);
  }
};

export const getGameByDate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    const response = await getGameByDateService(id, date);

    return res.status(200).json(response);
  } catch (error) {
    return handleHttp(res, "Error when getting the game by date", error);
  }
};

export const getTeamThatScoredTheMostGoals = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const response = await getTeamThatScoredTheMostGoalsService(id);

    setCache(req.originalUrl, response);

    return res.status(200).json(response);
  } catch (error) {
    return handleHttp(
      res,
      "Error when getting the Team that scored the most goals",
      error
    );
  }
};

export const gamesByDateRange = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.body;
    const { id } = req.params;

    const response = await gamesByDateRangeService(id, from, to);

    if (response?.length === 0)
      return res.status(404).json("No games found in the date range");

    return res.status(200).json(response);
  } catch (error) {
    return handleHttp(res, "Error getting games by date range", error);
  }
};

export const getPointsByDateRange = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { from, to } = req.body;

    const response = await getPointsByDateRangeService(id, from, to);

    return res.status(200).json({
      msg: `The number of points obtained in the date range is: ${response}`,
    });
  } catch (error) {
    return handleHttp(res, "Error getting point by date range", error);
  }
};
