import { ImageUpload } from "@/utils/imageUpload"
import { defineAction } from "astro:actions"
import { z } from "astro:content"
import { db, eq, ProductImage } from "astro:db"
import { getSession } from "auth-astro/server"

export const deleteProductImage = defineAction({
  accept: 'json',
  input: z.string(),
  handler: async (imageID, context) =>{
    const session = await getSession(context.request)
    const user = session?.user

    if(!user) {
      throw new Error('Unauthorized')
    }
    
    const [productImage] = await db
      .select()
      .from(ProductImage)
      .where(eq(ProductImage.id, imageID))
    
    if(!productImage) {
      throw new Error(`Product with id: ${imageID} not found`)
    }

    const deleted = await db
      .delete(ProductImage)
      .where(eq(ProductImage.id, imageID))

    if(productImage.image.includes('http')) { // esto hace falta si tienes imagenes locales y en el hosting. Si las tuvieras en el hosting solo, no haría falta porque siempre vienen del mismo lugar
      await ImageUpload.delete(productImage.image);
    }
    
    return {ok: true}
  }
})