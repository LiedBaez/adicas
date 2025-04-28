"use client"

import type React from "react"

import { useState } from "react"
import type { CartItem as CartItemType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Minus, Plus } from "lucide-react"

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveFromCart: (productId: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemoveFromCart }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number.parseInt(e.target.value) || 0
    setQuantity(newQuantity)
    onUpdateQuantity(item.product.id, newQuantity)
  }

  const handleIncrement = () => {
    const newQuantity = quantity + 1
    if (newQuantity <= item.product.stock) {
      setQuantity(newQuantity)
      onUpdateQuantity(item.product.id, newQuantity)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onUpdateQuantity(item.product.id, newQuantity)
    } else {
      onRemoveFromCart(item.product.id)
    }
  }

  const handleRemove = () => {
    onRemoveFromCart(item.product.id)
  }

  const subtotal = item.product.price * quantity

  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{item.product.name}</h4>
          <p className="text-sm text-gray-500">${item.product.price.toFixed(2)} por unidad</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 -mt-1 -mr-1"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none" onClick={handleDecrement}>
            <Minus className="h-3 w-3" />
          </Button>

          <Input
            type="number"
            min="1"
            max={item.product.stock}
            value={quantity}
            onChange={handleQuantityChange}
            className="h-8 w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={handleIncrement}
            disabled={quantity >= item.product.stock}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <div className="font-medium">${subtotal.toFixed(2)}</div>
      </div>
    </div>
  )
}
