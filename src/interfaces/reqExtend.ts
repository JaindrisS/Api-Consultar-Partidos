import { User } from "./user";
import { Request } from "express";

export interface RequestWithUserRol extends Request {
  user?: User;
}
