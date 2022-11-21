import { User, LogIn } from "../interfaces/user";
import { UserModel } from "../models/user";
import { comparePassword, hash } from "../utils/bcript";
import { sendEmail } from "../utils/emailer";
import { generateJwt } from "../utils/generateJwt";
import jwt from "jsonwebtoken";
import { Response } from "express";

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

export const forgotPasswordService = async (email: string) => {
  let message = ` The code to reset your password was sent to your email address ${email} `;

  // Get the user by mail
  const user: any = await UserModel.findOne({
    email: { $regex: email, $options: "i" },
  });

  // generate jwt with user.id
  let token: any = await generateJwt(user?.id);

  // save token in verification variable
  let verification: string = token;

  // Save token in user reserpassword field
  user.resetpassword = token;

  // Send verification token to user's email address
  await sendEmail(user, verification);
  await user.save();
  console.log(verification);

  return { message };
};

export const resetPasswordService = async (password: string, token: string) => {
  
  const user = await UserModel.findOne({ resetpassword: token });

  if (!user) {
    return false;
  }

  const passwordHash = await hash(10, password);
  user.password = passwordHash;
  user.resetpassword = undefined;
  await user.save();

  return { msg: "Password changed" };
};
