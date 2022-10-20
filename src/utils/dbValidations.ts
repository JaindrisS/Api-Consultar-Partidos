import { TeamModel } from "../models/team";

export const nameTeamExists = async (name: string) => {
  const nameExists = await TeamModel.findOne({
    name: { $regex: name, $options: "i" },
  });

  if (nameExists) {
    throw new Error(`The name ${nameExists.name} is not available`);
  }
};
