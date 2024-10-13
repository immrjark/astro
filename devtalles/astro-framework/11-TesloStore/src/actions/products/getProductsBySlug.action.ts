import type { ProductWithImages } from "@/interfaces";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { count, db, eq, Product, ProductImage, sql } from "astro:db";


export const getProductsBySlug = defineAction({
  accept: 'json',
  input: z.string(),
  handler: async (slug) => {
    const [product] = await db.select().from(Product).where(eq(Product.slug, slug));

    if(!product) {
      throw new Error(`Product with slug ${slug} not found`)
    }

    const images = await db.select().from(ProductImage).where(eq(ProductImage.id, product.id));
    
    return {
      product: product,
      images: images.map( i => i.image)
    }
  },
});
