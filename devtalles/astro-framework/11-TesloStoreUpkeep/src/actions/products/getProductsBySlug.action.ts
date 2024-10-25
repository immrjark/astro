import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, eq, Product, ProductImage } from "astro:db";


const newProductShell = {
  id: '',
  description: 'Product Description',
  gender: 'unisex',
  price: 0,
  sizes: 'M',
  slug: '',
  stock: 0,
  tags: '',
  title: '',
  type: '',
}

export const getProductsBySlug = defineAction({
  accept: 'json',
  input: z.string(),
  handler: async (slug) => {
    if(slug === 'new') {
      return {
        product: newProductShell,
        images: [],
      }
    }

    const [product] = await db
      .select()
      .from(Product)
      .where(eq(Product.slug, slug));

    if(!product) {
      throw new Error(`Product with slug ${slug} not found`)
    }

    const images = await db
      .select()
      .from(ProductImage)
      .where(eq(ProductImage.productId, product.id));
    
    return {
      product: product,
      images: images.map( i => i.image)
    }
  },
});
