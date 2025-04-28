"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ProductSearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function ProductSearchBar({ searchTerm, onSearchChange }: ProductSearchBarProps) {
  const [inputValue, setInputValue] = useState(searchTerm)
  const inputRef = useRef<HTMLInputElement>(null)

  // Actualizar el valor del input cuando cambia el searchTerm
  useEffect(() => {
    setInputValue(searchTerm)
  }, [searchTerm])

  // Manejar cambios en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    onSearchChange(value)
  }

  // Manejar la búsqueda al presionar Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchChange(inputValue)
    }
  }

  // Manejar clic en el botón de búsqueda
  const handleSearchClick = () => {
    onSearchChange(inputValue)
    inputRef.current?.blur()
  }

  return (
    <div className="relative mb-6">
      <div className="flex">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Buscar productos lácteos..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <Button onClick={handleSearchClick} className="ml-2">
          Buscar
        </Button>
      </div>
    </div>
  )
}
