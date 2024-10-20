import type CartItem from "@/interfaces/cartItem";
import { defineAction } from "astro:actions";
import { db, eq, inArray, Product, ProductImage } from "astro:db";


export const loadProductsFromCart = defineAction({
  accept: 'json',
  handler: async(_, context) => {
    const {cookies} = context;

    const cart = JSON.parse(cookies.get('cart')?.value ?? '[]') as CartItem[];

    if(cart.length === 0) return [];

    // Load de los productos
    const productId = cart.map(item => item.productId)

    const dbProducts = await db
      .select()
      .from(Product)
      .innerJoin(ProductImage, eq(Product.id, ProductImage.productId))
      .where(inArray(Product.id, productId))

    console.log(dbProducts);
    

    return cart.map( item => {
      const dbProduct = dbProducts.find( p => p.Product.id === item.productId )

      if (!dbProduct) {
        throw new Error(`Product with id ${item.productId} not found`)
      }

      const {title, price, slug} = dbProduct.Product;
      const image = dbProduct.ProductImage.image

      return {
        productId: item.productId,
        title: title,
        quantity: item.quantity,
        image: image.startsWith('http')
          ? image
          : `${import.meta.env.PUBLIC_URL}/images/products/${image}`,
        price: price,
        slug: slug
      }
    })
  }
})