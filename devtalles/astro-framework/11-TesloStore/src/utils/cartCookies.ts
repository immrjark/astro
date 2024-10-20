import type CartItem  from "@/interfaces/cartItem";
import Cookies from "js-cookie";

export class CartCookiesClient {
  static getCart(): CartItem[] {

    const cart = JSON.parse(Cookies.get('cart') ?? '[]')
    return[cart]
  }

  static addItem(cartItem: CartItem ): CartItem[] {
    const cart = CartCookiesClient.getCart();
    const ifExistItemInCart = cart.find(
      (item) => item.productId === cartItem.productId && item.size === cartItem.size // para comprobar si existe un producto en el carrito con el mismo id y talla
    )
    if(ifExistItemInCart) {
      ifExistItemInCart.quantity += cartItem.quantity
    } else {
      cart.push(cartItem)
    }

    Cookies.set('cart', JSON.stringify(cart))

    return cart
  }

  static removeItem(productId: string, size: string): CartItem[] {

    const cart = CartCookiesClient.getCart()
    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.size === size)
    )
    Cookies.set('cart', JSON.stringify(cart))


    return updatedCart
  }
}