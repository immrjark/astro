import { defineConfig } from "auth-astro";
import Credentials from "@auth/core/providers/credentials";
import { db, eq, User } from "astro:db";
import bcrypt from "bcryptjs";

export default defineConfig({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async ({ email, password }) => {
        const [user] = await db
          .select()
          .from(User)
          .where(eq(User.email, `${email}`));

        if (!user) {
          throw new Error("Invalid Credentials ");
        }

        if (!bcrypt.compareSync(password as string, user.password)) {
          throw new Error("Invalid Password");
        }

        const { password: _, ...rest } = user; // hago que no llegue al usuario la contraseña por motivos de seguridad

        return rest;
      },
    }),
  ],
});
