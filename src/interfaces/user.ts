export interface User {
  name: string;
  password: string;
  email: string;
  status: boolean;
  resetpassword?: string;
  rol: "ADMIN" | "USER";
  img:string
}

export type LogIn = Pick<User, "email" | "password">;