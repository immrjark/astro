import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, eq, Product } from "astro:db";
import { getSession } from "auth-astro/server";
import { v4 as UUID } from 'uuid';

export const updateProduct = defineAction({
  accept: 'form',
  input: z.object({
    id: z.string().optional(),
    description: z.string(),
    gender: z.string(),
    price: z.number(),
    sizes: z.string(),
    slug: z.string(),
    stock: z.number(),
    tags: z.string(),
    title: z.string(),
    type: z.string(),
  }),
  handler: async (form, context) =>{

    const {request} = context;

    const session = await getSession(request)
    const user = session?.user

    if(!user) {
      throw new Error('Unauthorized')
    }
    // console.log(user);
    const {id = UUID(), ...rest} = form
    rest.slug = rest.slug.toLocaleLowerCase().replaceAll(' ', '-').trim()

    const product = {
      id: id,
      user: user.id!,
      ...rest,
    };

    // console.log(product);

    if( !form.id ) {
      await db.insert(Product).values(product)
    } else {
      await db.update(Product).set(product).where(eq(Product.id, id))
    }
    await db.update(Product).set(product).where(eq(Product.id, id))
    
    
    return product
  }
})