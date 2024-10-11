import { db, Role, User } from 'astro:db';
import { v4 as UUID} from 'uuid' // paquete instalado para crear las ids de los users 'pnpm i uuid' junto con sus types 'pnpm i -D @types/uuid'
import bcrypt from 'bcryptjs' // para crear contraseñas de una única via 'pnpm i bcryptjs' junto con sus types 'pnpm i --save-dev @types/bcryptjs'

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	const roles = [
		{id: 'admin', name: 'Admin'},
		{id: 'user', name: 'User'}
	]

	const normalMan = {
		id: UUID(), // con este uuid cada vez que bajes y subas las databases se genera uno nuevo y por ende, se pierden credenciales
		email: 'normalman@google.com',
		name: 'Nomral Man',
		password: bcrypt.hashSync('123456'),
		role: 'admin'
	}
	const madDog = {
		id: UUID(),
		email: 'maddog@google.com',
		name: 'Nomral Man',
		password: bcrypt.hashSync('123456'),
		role: 'user'
	}

	await db.insert(Role).values(roles)
	await db.insert(User).values([normalMan, madDog])
}
