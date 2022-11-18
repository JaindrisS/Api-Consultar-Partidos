import { genSaltSync, hashSync } from "bcryptjs";

export const hash = async (rounds: number, password: string) => {
  const salt = genSaltSync(rounds);
  const hast = hashSync(password, salt);

  return hast;
};
