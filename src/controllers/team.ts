import { Response, Request } from "express";
import { createTeamService, getTeamService } from "../services/team";

export const createTeam = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
};

export const getTeam = async (_req: Request, res: Response) => {
  const response = await getTeamService();

  return res.status(200).json(response);
};
