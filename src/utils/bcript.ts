import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export const hash = async (rounds: number, password: string) => {
  const salt = genSaltSync(rounds);
  const hast = hashSync(password, salt);

  return hast;
};

export const comparePassword = async (
  passwordToCompare: string,
  passwordHash: string
) => {
  let compare = compareSync(passwordToCompare, passwordHash);
  return compare;
};
