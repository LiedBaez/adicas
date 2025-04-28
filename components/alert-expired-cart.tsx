"use client"

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AlertExpiredCartProps {
  onClose: () => void
}

export function AlertExpiredCart({ onClose }: AlertExpiredCartProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center text-red-600 mb-4">
          <AlertCircle className="h-6 w-6 mr-2" />
          <h3 className="text-lg font-semibold">Carrito expirado</h3>
        </div>

        <p className="text-gray-700 mb-6">Tu carrito ha expirado. Por favor, vuelve a seleccionar productos.</p>

        <Button onClick={onClose} className="w-full">
          Aceptar
        </Button>
      </div>
    </div>
  )
}
