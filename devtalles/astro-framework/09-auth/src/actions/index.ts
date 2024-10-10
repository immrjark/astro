import { logInUser, loginWithGoogle, logOutUser, signUpUser } from "./auth"
export const server = {
  // exportacion de actions

  //Authentication
  signUpUser,
  logOutUser,
  logInUser,
  loginWithGoogle,
}