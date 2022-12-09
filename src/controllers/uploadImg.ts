import { Request, Response } from "express";
import { uploadImgService } from "../services/uploadImg";
import { handleHttp } from "../utils/error.handle";


export const uploadImg = async (req: Request, res: Response) => {
  try {
  const { id } = req.params;

  const { tempFilePath }: any = req.files?.file;

  const response =await uploadImgService(id, tempFilePath);

  return res.status(201).json({ msg: "The image was uploaded correctly" });
    
  } catch (error) {
return handleHttp(res, "Error uploading image", error);
  }
};
