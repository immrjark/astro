import type { ProductWithImages } from "@/interfaces"
import { ProductCard } from "./ProductCard";

interface Props {
  products: ProductWithImages[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
      {
        products.map(
          product => (
            <ProductCard product={product} key={product.id}/>
          )
        )
      }
    </div>
  )
}