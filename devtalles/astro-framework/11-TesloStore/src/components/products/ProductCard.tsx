import type { ProductWithImages } from "@/interfaces"
import { useState } from "react";

interface Props {
  product: ProductWithImages;
}

export const ProductCard = ({product}: Props) => {
  const images = product.images.split(',').map(img => {
    return img.startsWith('http')
      ? img
      : `${import.meta.env.PUBLIC_URL}/images/products/${img}` // para coger la imagen si no está en la nuve (DONDE SIEMPRE DEBE ESTAR)
  })

  const [currentImage, setCurrentImage] = useState(images[0])
  return (
    <section className="flex flex-col">
      <a href={`/products/${product.slug}`}>
        <img src={currentImage} alt={`${product.title}`} className="h-[250px] object-contain" onMouseEnter={() => setCurrentImage(images[1] ?? images[0]) } onMouseLeave={() => setCurrentImage(images[0])}/>
        <h2 className="hover:underline">{product.title}</h2>
      </a>
      <p>${product.price}</p>
    </section>

  )
}