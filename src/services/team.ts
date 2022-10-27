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

export const getLastGameService = async (id: string) => {
  //    I get the information of the equipment by its id,
  const infoTeam = await TeamModel.findById(id);

  // traverse and save the dates of the array
  const dateTeam = infoTeam?.games.map((e) => {
    return e.date;
  });

  //check major date
  const date: any = dateTeam?.map((e) => new Date(e));
  const dateMax = new Date(Math.max.apply(null, date));

  // Transform to string
  const dateString = dateMax.toISOString();

  // get only the date
  const onlyDate = dateString.substring(0, 10);

  // return the match that is equal to the given date
  const response = infoTeam?.games.filter((e) => {
    return e.date === onlyDate;
  });

  return response;
};
