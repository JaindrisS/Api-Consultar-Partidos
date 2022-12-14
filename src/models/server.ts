import express, { Application } from "express";
import gamesRouters from "../v1/routers/team";
import authRouters from "../v1/routers/auth";
import uploadRouter from "../v1/routers/uploadImg";
import fileUpload from "express-fileupload";
import { dbConnect } from "../config/dbConnect";

export default class Server {
  private app: Application;
  private port: string;
  private path = {
    games: "/consultar-partidos/api/v1/games",
    auth: "/consultar-partidos/api/v1/auth",
    upload: "/consultar-partidos/api/v1/upload",
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
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  router() {
    this.app.use(this.path.games, gamesRouters);
    this.app.use(this.path.auth, authRouters);
    this.app.use(this.path.upload, uploadRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }
}
