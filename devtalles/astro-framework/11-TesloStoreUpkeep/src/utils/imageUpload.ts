// configuaración de cloudinary
import { v2 as cloudinary} from 'cloudinary'

cloudinary.config({ 
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME, 
  api_key: import.meta.env.CLOUDINARY_PUBLIC_API_KEY, 
  api_secret:  import.meta.env.CLOUDINARY_SECRET_API_KEY// Click 'View API Keys' above to copy your API secret
});

export class ImageUpload {
  static async upload(file: File) {

    //  hjay que hacer esta 3 líneas porque el upload solo acepta string por ende, hay que transformar la imagen a esto
    const buffer = await file.arrayBuffer()
    const base64image = Buffer.from(buffer).toString('base64')
    const imageType = file.type.split('/')[1] // esto es así porque suele venir /images/alsgflha.png y te interesa la segunda parte

    const resp = await cloudinary.uploader.upload(
      `data:image/${imageType};base64,${base64image}`
    )

    // console.log(resp);

    return resp.secure_url;
  }

  static async delete(image: string) {
    try {
      const imageName = image.split('/').pop() ?? '';
      const imageId = imageName?.split('.')[0]
  
      const resp = await cloudinary.uploader.destroy(imageId)
      
      console.log(resp)
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }
}