import { NextFunction, Request, Response } from "express";
import { RequestWithUserRol } from "../interfaces/reqExtend";

export const hasRol = (...rols: string[]) => {
  return (req: RequestWithUserRol, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        msg: "You want to validate the role without verifying the token first",
      });
    }

    if (!rols.includes(req.user.rol)) {
      return res.status(403).json({ msg: `These roles ${rols} are required` });
    }

    return next();
  };
};
