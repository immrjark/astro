import { loginUser, logout, registerUser } from './auth';
import { loadProductsFromCart } from './cart/loadProductsFromCart.action';
import { getProductsByPage } from './products/getProductsByPage.actions';
import { getProductsBySlug } from './products/getProductsBySlug.action';

export const server = {
  // actions

  // Auth
  loginUser,
  logout,
  registerUser,

  // Products
  getProductsByPage,
  getProductsBySlug,

  //Cart
  loadProductsFromCart,
};
