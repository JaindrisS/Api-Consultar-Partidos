import { Response, Request } from "express";
import {
  createTeamService,
  getTeamService,
  addGameService,
  getLastGameService,
  getGameByIdService,
  getGameByDateService,
} from "../services/team";
import { handleHttp } from "../utils/error.handle";
// import { validateDate } from "../utils/validations";

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

export const getTeam = async (_req: Request, res: Response) => {
  try {
    const response = await getTeamService();

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
