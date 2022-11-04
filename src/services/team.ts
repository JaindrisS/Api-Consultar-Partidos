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

export const getGameByIdService = async (id: string) => {
  const response = await TeamModel.findById(id);
  if (response?.status === false) {
    return `the team does not exist`;
  }
  return response;
};

export const getGameByDateService = async (id: string, date: string) => {
  const getGame = await TeamModel.findById(id);

  const response = getGame?.games.filter((e) => {
    return e.date === date;
  });

  return response;
};

export const getTeamThatScoredTheMostGoalsService = async (id: string) => {
  // get team by id
  const infoTeam = await TeamModel.findById(id);
  // access to games
  const gamesInfo = infoTeam?.games;
  // return the team that scored the most goals
  const goalsConcededMax: any = gamesInfo?.map((e) => e.goalsConceded);
  const max: any = Math.max(...goalsConcededMax);
  const majorScored = gamesInfo?.filter((e) => e.goalsConceded === max);

  // return

  return majorScored;
};
