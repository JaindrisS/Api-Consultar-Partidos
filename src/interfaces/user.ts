export interface User {
  name: string;
  password: string;
  email: string;
  status: boolean;
}

export type LogIn = Pick<User, "email" | "password">;
