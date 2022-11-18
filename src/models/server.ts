import express, { Application } from "express";
import gamesRouters from "../v1/routers/team";
import authRouters from "../v1/routers/auth";

import { dbConnect } from "../config/dbConnect";

export default class Server {
  private app: Application;
  private port: string;
  private path = {
    games: "/api/v1/games",
    auth: "/api/v1/auth",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";
    this.middleware();
    this.router();
    this.connectionDb();
  }

  async connectionDb() {
    await dbConnect();
  }

  middleware() {
    this.app.use(express.json());
  }

  router() {
    this.app.use(this.path.games, gamesRouters);
    this.app.use(this.path.auth, authRouters);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }
}
