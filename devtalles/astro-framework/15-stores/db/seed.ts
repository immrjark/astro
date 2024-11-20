import { db, Role, User } from "astro:db";
import { v4 as UUID } from "uuid";
import bcrypt from "bcryptjs";

// https://astro.build/db/seed
export default async function seed() {
  const roles = [
    { id: "admin", name: "Admin" },
    { id: "user", name: "Reader" },
  ];

  const normalman = {
    id: UUID(),
    name: "normalman",
    email: "normalman@google.com",
    password: bcrypt.hashSync("123456"), // forma para encriptar una contraseña
    role: "admin",
  };
  const maddog = {
    id: UUID(),
    name: "maddog",
    email: "maddog@google.com",
    password: bcrypt.hashSync("567890"), // forma para encriptar una contraseña
    role: "user",
  };

  await db.insert(Role).values(roles);
  await db.insert(User).values([normalman, maddog]);
}
