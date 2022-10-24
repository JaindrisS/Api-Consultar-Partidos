import { TeamModel } from "../models/team";

export const nameTeamExists = async (name: string) => {
  const nameExists = await TeamModel.findOne({
    name: { $regex: name, $options: "i" },
  });

  if (nameExists) {
    throw new Error(`The name ${nameExists.name} is not available`);
  }
};

export const idTeam = async (id: string) => {
  const response = await TeamModel.findById(id);

  if (!response) {
    throw new Error(`The Id does not exists in the database`);
  }
};
