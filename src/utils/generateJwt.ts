import Jwt from "jsonwebtoken";

export const generateJwt = async (uid: string) => {
  return new Promise((resolve, reject) => {
    let payload = { uid };
    Jwt.sign(
      payload,
      <string>process.env.JWTPRIVATEKEY,
      {
        expiresIn: "30min",
      },
      (error, token) => {
        
        error ? reject("Could not generate jwt") : resolve(token);
      }
    );
  });
};
