import { Response } from "express";

export const handleHttp = (
  res: Response,
  error: string,
  errorRaw: any
): Response => {
  console.log(errorRaw);

  return res.status(500).json({ error });
};
