import { Router } from "express";
import { param } from "express-validator";
import { uploadImg } from "../../controllers/uploadImg";
import { validateFiles } from "../../middlewares/validateFiles";
import { validateField } from "../../middlewares/validateresult";
const app = Router();

app.put(
  "/:id",
  [validateFiles, param("id", "Invalid id").isMongoId(), validateField],
  uploadImg
);

export default app;
