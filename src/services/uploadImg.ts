import { UserModel } from "../models/user";
import Cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

Cloudinary.v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME,
});
export const uploadImgService = async (id: string, tempFilePath: string) => {
  const user: any = await UserModel.findById(id);

  // delete cloudinary preview image - if it is for a user with img
  if (user.img) {
    let nameArr = user.img.split("/");
    let ImgName = nameArr[nameArr.length - 1];
    let [publicId] = ImgName.split(".");
    await Cloudinary.v2.uploader.destroy(publicId);
  }
  // save new img in cloudinary
  const { secure_url } = await Cloudinary.v2.uploader.upload(tempFilePath);

  user.img = secure_url;
  await user.save();

  return user;
};
