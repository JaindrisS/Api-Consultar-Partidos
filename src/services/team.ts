import { Games, Team } from "../interfaces/team";
import { TeamModel } from "../models/team";

export const createTeamService = async (team: Team) => {
  const newTeam = new TeamModel(team);
  await newTeam.save();
  return newTeam;
};

export const getTeamService = async () => {
  const response = await TeamModel.find({ status: true });

  return response;
};

export const addGameService = async (id: string, games: Games) => {
  const { rival, goalsConceded, goalsScored, date, points } = games;

  const response = await TeamModel.findByIdAndUpdate(id, {
    $push: {
      games: {
        rival,
        goalsConceded,
        goalsScored,
        date,
        points,
      },
    },
  });

  return response;
};
