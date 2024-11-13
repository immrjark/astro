import { Clients, db } from "astro:db";


// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Clients).values([
    { id: 1, name:'mrjark', age: 27, isActive: true},
    { id: 2, name:'maria', age: 22, isActive: false},
    { id: 3, name:'mario', age: 29, isActive: true},
  ]);
	console.log('Seed Executed');
}
