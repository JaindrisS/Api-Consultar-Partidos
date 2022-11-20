import { Response, Request } from "express";
import {
  forgotPasswordService,
  logInService,
  signUpService,
} from "../services/auth";
import { handleHttp } from "../utils/error.handle";

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = req.body;

    const { name, email } = await signUpService(data);

    return res.status(201).json({ msg: `User Created`, name, email });
  } catch (error) {
    return handleHttp(res, "Error could not create user", error);
  }
};

export const logIn = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = req.body;

    const response = await logInService(data);

    return res.status(200).json({ msg: response });
  } catch (error) {
    return handleHttp(res, "Login Error", error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.body;

    const response = await forgotPasswordService(email);

    return res.status(201).json(response);
  } catch (error) {
    return handleHttp(res, "Error trying to recover password", error);
  }
};
