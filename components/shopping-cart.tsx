"use client"

import { useState, useEffect } from "react"
import type { CartItem as CartItemType } from "@/lib/types"
import { CartItem } from "@/components/cart-item"
import { Timer } from "@/components/timer"
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon as CartIcon, CheckCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface ShoppingCartProps {
  cartItems: CartItemType[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveFromCart: (productId: string) => void
  onConfirmPurchase: () => void
  timerDuration: number
  onTimerExpired: () => void
  isTimerExpired: boolean
}

export function ShoppingCart({
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
  onConfirmPurchase,
  timerDuration,
  onTimerExpired,
  isTimerExpired,
}: ShoppingCartProps) {
  const [totalAmount, setTotalAmount] = useState(0)

  // Calcular el monto total del carrito
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    setTotalAmount(total)
  }, [cartItems])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <CartIcon className="mr-2 h-5 w-5" />
          Carrito de compra
        </h2>

        <Timer duration={timerDuration} onExpire={onTimerExpired} isExpired={isTimerExpired} />
      </div>

      <Separator className="mb-4" />

      {cartItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-6">
          <CartIcon className="h-16 w-16 mb-4 opacity-20" />
          <p className="text-center">Tu carrito está vacío</p>
          <p className="text-center text-sm mt-2">Agrega productos desde la lista</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto mb-4">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveFromCart={onRemoveFromCart}
                />
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <Separator className="mb-4" />

            <div className="flex justify-between items-center mb-2 text-lg font-bold">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <Button
              onClick={onConfirmPurchase}
              disabled={cartItems.length === 0 || isTimerExpired}
              className="w-full py-6 mt-4"
              size="lg"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Confirmar compra
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
