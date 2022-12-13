import { NextFunction, Request, Response } from "express";
import cache from "node-cache";

export const myCache: any = new cache({ stdTTL: 100, checkperiod: 120 });

export const setCache = (originalUrl: string, data: any) => {
  myCache.set(originalUrl, JSON.stringify(data));
  return console.log("Data saved in cache");
};

export const getCache = (req: Request, res: Response, next: NextFunction) => {
  let key = req.originalUrl;

  if (myCache.has(key)) {
    return res
      .status(200)
      .json({ msg: "data fron cache", Result: JSON.parse(myCache.get(key)) });
  }
  return next();
};
