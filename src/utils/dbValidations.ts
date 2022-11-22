import { TeamModel } from "../models/team";
import { UserModel } from "../models/user";

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

export const emailAlreadyExists = async (email: string) => {
  const response = await UserModel.findOne({
    email: { $regex: email, $options: "i" },
  });

  if (response) {
    throw new Error("The email already exists ,not available");
  }
};

export const emailDoesNotExist = async (email: string) => {
  const response = await UserModel.findOne({
    email: { $regex: email, $options: "i" },
  });

  if (!response) {
    throw new Error("The email does not exist, Enter a valid email");
  }
};

export const idDoesNotExist = async (id: string) => {
  const response = await UserModel.findById(id);

  if (!response) {
    throw new Error("The id does not exist, Enter a valid id");
  }
};
