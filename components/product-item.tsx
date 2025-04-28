"use client"

import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface ProductItemProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductItem({ product, onAddToCart }: ProductItemProps) {
  const handleAddToCart = () => {
    onAddToCart(product)
  }

  return (
    <div className="p-4 flex items-center justify-between hover:bg-gray-50">
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <div className="mt-1 flex flex-col sm:flex-row sm:gap-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Precio:</span> ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Stock:</span>{" "}
            <span className={product.stock < 10 ? "text-red-600 font-medium" : ""}>{product.stock} unidades</span>
          </p>
        </div>
      </div>

      <Button onClick={handleAddToCart} disabled={product.stock <= 0} className="ml-4" size="sm">
        <PlusCircle className="mr-2 h-4 w-4" />
        Añadir
      </Button>
    </div>
  )
}
