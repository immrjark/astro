import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/private']

export const onRequest = defineMiddleware(async (context, next) => {


  return next()
});

