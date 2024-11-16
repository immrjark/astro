import { logIn, loginWithGoogle, logOut, signinUser } from "./auth";

export const server = {
  // actions

  // auth
  signinUser,
  logOut,
  logIn,
  loginWithGoogle,
}