import { User } from "../interfaces/user";
import { UserModel } from "../models/user";
import { hash } from "../utils/bcript";

export const signUpService = async (data: User) => {
  const { password, email, name } = data;

  const passwordHash = hash(10, password);

  const user = {
    name: name.toUpperCase(),
    email,
    password: (await passwordHash).toString(),
  };

  const response = new UserModel(user);

  await response.save();
  return response;
};
