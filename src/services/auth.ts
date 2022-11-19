import { User, LogIn } from "../interfaces/user";
import { UserModel } from "../models/user";
import { comparePassword, hash } from "../utils/bcript";

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

export const logInService = async (data: LogIn) => {
  const { password, email } = data;

  const user: any = await UserModel.findOne({
    email: { $regex: email, $options: "i" },
  });

  if (!user || !user.status) {
    return { msg: "Invalid email or password" };
  }

  const userValid = await comparePassword(password, user.password);
  if (!userValid) {
    return { msg: "Invalid email or password" };
  }

  return "Login Ok";
};
