import { itemInCart } from "@/store"
import { CartCookiesClient } from "@/utils"
import { useStore } from '@nanostores/react'
import { useEffect } from "react"

export const CartCounter = () => {

  const $itemsInCart = useStore(itemInCart)
  useEffect(() => {
    const cart = CartCookiesClient.getCart()
    itemInCart.set(cart.length)
  }, [])
  

  return (
    <a href="/cart" className="relative inline-block">
      <span className="absolute -top-2 -right-2 flex justify-center items-center bg-blue-500 text-white text-xs rounded-full w-5 h-5">
        {$itemsInCart}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <circle cx="9.549" cy="19.049" r="1.701"/>
          <circle cx="16.96" cy="19.049" r="1.701"/>
        <path d="m5.606 5.555l2.01 6.364c.309.978.463 1.467.76 1.829c.26.32.599.567.982.72c.435.173.947.173 1.973.173h3.855c1.026 0 1.538 0 1.972-.173c.384-.153.722-.4.983-.72c.296-.362.45-.851.76-1.829l.409-1.296l.24-.766l.331-1.05a2.5 2.5 0 0 0-2.384-3.252zm0 0l-.011-.037a7 7 0 0 0-.14-.42a2.92 2.92 0 0 0-2.512-1.84C2.84 3.25 2.727 3.25 2.5 3.25"/>
        </g>
      </svg>
    </a>
  )
}