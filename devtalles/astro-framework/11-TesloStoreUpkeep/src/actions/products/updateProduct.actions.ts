import { ImageUpload } from "@/utils/imageUpload";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, eq, Product, ProductImage } from "astro:db";
import { getSession } from "auth-astro/server";
import { v4 as UUID } from 'uuid';

const MAX_FILE_SIZE = 5_000_000 // 5megas
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg+xml',
]

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

    // cargar imagenes
    imageFiles: z.array(
      z.instanceof(File) // esto es así porque es una instancia de archivo
        .refine(file => file.size <= MAX_FILE_SIZE, 'Max. image size is 5MG')
        .refine( file => {
          if( file.size === 0 ) return true; // porque a veces da un error de uqe se envia una imagen vacia sin tener seleccionada ninguna
          // se puede hacer con el return o como la forma de arriba
          return ACCEPTED_IMAGE_TYPES.includes(file.type)
        }, `Only supported image files are valid, ${ACCEPTED_IMAGE_TYPES.join(',')}`)
    ).optional()
        // .refine( file => ACCEPTED_IMAGE_TYPES.includes(file.type), `Only supported image files are valid, ${ACCEPTED_IMAGE_TYPES.join(',')}`).optional()),
  }),
  handler: async (form, context) =>{

    const {request} = context;

    const session = await getSession(request)
    const user = session?.user

    if(!user) {
      throw new Error('Unauthorized')
    }
    // console.log(user);
    const {id = UUID(), imageFiles, ...rest} = form
    rest.slug = rest.slug.toLocaleLowerCase().replaceAll(' ', '-').trim()

    const product = {
      id: id,
      user: user.id!,
      ...rest,
    };

    // console.log(product);

    const queries: any = []

    if( !form.id ) {
      queries.push(
        db.insert(Product).values(product)
      )
    } else {
      queries.push(
        db.update(Product).set(product).where(eq(Product.id, id))
      )
    }    
    // images
    // console.log(imageFiles);
    // imageFiles?.forEach( async (imageFile) => {
    //   if(imageFile.size <= 0) return
    //   const url = await ImageUpload.upload(imageFile)
    // })

    // Lo hago de esta manera porque las condiciones que se tienen que cumplir son todas estas para que haya una url de ahí que haya quitado el de imageFiles?
    const secureUrl:string[] = []
    if (form.imageFiles && form.imageFiles.length > 0 && form.imageFiles[0].size > 0) {
      const urls = await Promise.all(
        form.imageFiles.map(
          file => ImageUpload.upload(file)
        )
      )
      secureUrl.push(...urls)
    }

    secureUrl.forEach(imageUrl => {
      const imageObj = {
        id: UUID(),
        image: imageUrl,
        productId: product.id,
      }

      queries.push(db.insert(ProductImage).values(imageObj))
    })

    await db.batch(queries)
    
    return product;
  }
})