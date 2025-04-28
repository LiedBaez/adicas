import type { Product } from "@/lib/types"
import { ProductItem } from "@/components/product-item"

interface ProductListProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Productos disponibles</h2>
      </div>

      {products.length === 0 ? (
        <div className="p-6 text-center text-gray-500">No se encontraron productos. Intenta con otra búsqueda.</div>
      ) : (
        <div className="divide-y divide-gray-200">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  )
}
