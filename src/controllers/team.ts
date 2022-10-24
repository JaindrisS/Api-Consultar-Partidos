import { Response, Request } from "express";
import {
  createTeamService,
  getTeamService,
  addGameService,
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

export const getTeam = async (_req: Request, res: Response) => {
  try {
    const response = await getTeamService();

    return res.status(200).json(response);
  } catch (error) {
    return handleHttp(res, "Error when obtaining the teams", error);
  }
};

export const addGame = async (req: Request, res: Response) => {
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
};
