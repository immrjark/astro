import { db, Role, User, Product, ProductImage } from 'astro:db';
import { v4 as UUID} from 'uuid' // paquete instalado para crear las ids de los users 'pnpm i uuid' junto con sus types 'pnpm i -D @types/uuid'
import bcrypt from 'bcryptjs' // para crear contraseñas de una única via 'pnpm i bcryptjs' junto con sus types 'pnpm i --save-dev @types/bcryptjs'
import { seedProducts } from './seed-data';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	const roles = [
		{id: 'admin', name: 'Admin'},
		{id: 'user', name: 'User'}
	]

	const normalMan = {
		id: 'ABC-123-NORMAL', // debería ser con UUID pero para que no de error cada vez que subas y bajes la app y se pierda el user, le doy un concreto
		// UUID(), // con este uuid cada vez que bajes y subas las databases se genera uno nuevo y por ende, se pierden credenciales
		email: 'normalman@google.com',
		name: 'Nomral Man',
		password: bcrypt.hashSync('123456'),
		role: 'admin'
	}
	const madDog = {
		id: 'ABC-123-DOG',
		// UUID(),
		email: 'maddog@google.com',
		name: 'Mad Dog',
		password: bcrypt.hashSync('123456'),
		role: 'user'
	}

	await db.insert(Role).values(roles)
	await db.insert(User).values([normalMan, madDog])

	const queries: any = [];
	
	seedProducts.forEach( (p) => {
		const product = {
			id: UUID(),
			description: p.description,
			gender: p.gender,
			price: p.price,
			sizes: p.sizes.join(','), 
			slug: p.slug,
			stock: p.stock,
			tags: p.tags.join(','),
			title: p.title,
			type: p.type,
			user: normalMan.id
		};

		queries.push(db.insert(Product).values(product))

		p.images.forEach(img => {
			const image = {
				id: UUID(),
				image: img,
				productId: product.id,
			}
			queries.push(db.insert(ProductImage).values(image))
		})
	})

	await db.batch(queries)
}
