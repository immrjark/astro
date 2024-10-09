import { logInUser, logOutUser, signUpUser } from "./auth"
export const server = {
  // exportacion de actions

  //Authentication
  signUpUser,
  logOutUser,
  logInUser,
}