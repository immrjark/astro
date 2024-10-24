import type CartItem from "@/interfaces/cartItem";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, eq, inArray, Product, ProductImage } from "astro:db";

export const loadProductsFromCart = defineAction({
  accept: 'json',
  input: z.object({
    cookies: z.string(),
  }),
  handler: async ({cookies}) => {
    // const {cookies} = input
    // const {cookies} = context

    const cart = JSON.parse(cookies) as CartItem[]

    // console.log({cart})
    // const cart = JSON.parse(cookies) as CartItem[]
    // // const cart = JSON.parse(cookies.get('cart')?.value ?? '[]') as CartItem[]

    // if(cart.length === 0) return []

    // //load de los productos
    const productsId = cart.map(i => i.productId);
    const dbProducts = await db
      .select()
      .from(Product)
      .innerJoin(ProductImage, eq(Product.id, ProductImage.productId))
      .where( inArray(Product.id, productsId))
    
    // // console.log(dbProducts);
      
    // // return[]
    return cart.map(i => {

      const dbProduct = dbProducts.find( p => p.Product.id === i.productId )
      if( !dbProduct) {
        throw new Error(`Product with id: ${i.productId} is not found`)
      }

      const {title, price, slug} = dbProduct.Product
      const image = dbProduct.ProductImage.image;

      return {
        productId: i.productId,
        title: title,
        size: i.size,
        quantity: i.quantity,
        image: image.startsWith('http')
          ? image
          : `${import.meta.env.PUBLIC_URL}/images/products/${image}`,
        price: price,
        slug: slug,
      }

    })
  },
});