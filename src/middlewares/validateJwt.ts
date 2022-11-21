import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";
import { handleHttp } from "../utils/error.handle";

export const validateJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("token");

  if (!token) {
    res.status(401).json("Enter a token");
  }

  try {
    let { uid } = jwt.verify(
      <string>token,
      <string>process.env.JWTPRIVATEKEY
    ) as { uid: string };

    const user = await UserModel.findById(uid);

    if (!user) {
      return res.status(401).json({ msg: "User does not exist invalid token" });
    }

    if (!user.status) {
      return res.status(401).json({ msg: "Invalid token - status false" });
    }

    return next();
  } catch (error) {
    return handleHttp(res, "Invalid token", error);
  }
};
