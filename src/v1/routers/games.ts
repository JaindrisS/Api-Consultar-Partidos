import { Router, Request, Response } from "express";

const app = Router();

app.get("/", (_req: Request, res: Response) => {
  res.json("Get from Router games");
});

export default app;
