import { loginUser, logout, registerUser } from './auth';
import { getProductsByPage } from './products/getProductsByPage.actions';

export const server = {
  // actions

  // Auth
  loginUser,
  logout,
  registerUser,

  // Products
  getProductsByPage,
};
