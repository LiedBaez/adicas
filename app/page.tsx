"use client"

import { useState, useEffect } from "react"
import { ProductSearchBar } from "@/components/product-search-bar"
import { ProductList } from "@/components/product-list"
import { ShoppingCart } from "@/components/shopping-cart"
import { AlertExpiredCart } from "@/components/alert-expired-cart"
import type { Product, CartItem } from "@/lib/types"
import { mockProducts } from "@/lib/mock-data"

export default function CarritoCompras() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isTimerExpired, setIsTimerExpired] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [timerDuration, setTimerDuration] = useState(10 * 60) // 10 minutos en segundos

  // Filtrar productos basado en el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredProducts(filtered)
    }
  }, [searchTerm, products])

  // Manejar la expiración del timer
  const handleTimerExpired = () => {
    setIsTimerExpired(true)
    setShowAlert(true)
    setCartItems([])
  }

  // Añadir producto al carrito
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id)

      if (existingItem) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        // Si el producto no está en el carrito, añadirlo con cantidad 1
        return [...prevItems, { product, quantity: 1 }]
      }
    })
  }

  // Actualizar cantidad de un producto en el carrito
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  // Eliminar producto del carrito
  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  // Confirmar compra
  const handleConfirmPurchase = () => {
    // Aquí se enviaría la información a la API de AWS
    console.log("Orden confirmada:", cartItems)

    // Limpiar el carrito después de confirmar
    setCartItems([])

    // Mostrar mensaje de confirmación (opcional)
    alert("¡Compra confirmada con éxito!")
  }

  // Cerrar alerta de carrito expirado
  const handleCloseAlert = () => {
    setShowAlert(false)
    setIsTimerExpired(false)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="w-full md:w-2/3 p-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Distribuidora de Lácteos</h1>

        <ProductSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
      </div>

      <div className="w-full md:w-1/3 bg-white p-4 md:p-6 border-t md:border-t-0 md:border-l border-gray-200">
        <ShoppingCart
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          onConfirmPurchase={handleConfirmPurchase}
          timerDuration={timerDuration}
          onTimerExpired={handleTimerExpired}
          isTimerExpired={isTimerExpired}
        />
      </div>

      {showAlert && <AlertExpiredCart onClose={handleCloseAlert} />}
    </div>
  )
}
