import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ['/private']

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async(context, next) => {
  const {url, request, locals} = context;

  const isLoggedIn = !!firebase.auth.currentUser;
  const user = firebase.auth.currentUser

  // para pasar la info a otras pantallas
  locals.isLoggedIn = isLoggedIn;

  return next();
});