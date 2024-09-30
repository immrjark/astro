import { getCollection } from "astro:content";
import { Clients, db, Posts } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { id: 1, name: "Chema", age: 27, isActive: true },
    { id: 2, name: "Adam", age: 33, isActive: true },
    { id: 3, name: "mrjark", age: 28, isActive: false },
  ]);

  // base de datos en local
  const posts = await getCollection("blog");
  await db.insert(Posts).values(
    posts.map((post) => ({
      id: post.id,
      title: post.data.title,
      likes: Math.round(Math.random() * 100),
    }))
  );
  // TODO
  console.log("Seed executed");
}
