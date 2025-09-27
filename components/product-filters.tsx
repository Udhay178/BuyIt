"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const categories = [
  { id: "electronics", name: "Electronics", count: 2500 },
  { id: "fashion", name: "Fashion", count: 5000 },
  { id: "home", name: "Home & Garden", count: 3200 },
  { id: "sports", name: "Sports", count: 1800 },
  { id: "books", name: "Books", count: 1200 },
  { id: "toys", name: "Toys", count: 800 },
]

const brands = [
  { id: "apple", name: "Apple", count: 150 },
  { id: "samsung", name: "Samsung", count: 200 },
  { id: "nike", name: "Nike", count: 300 },
  { id: "adidas", name: "Adidas", count: 250 },
  { id: "sony", name: "Sony", count: 180 },
]

export function ProductFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandId])
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 1000])
  }

  const activeFiltersCount =
    selectedCategories.length + selectedBrands.length + (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId)
              return (
                <Badge key={categoryId} variant="secondary" className="flex items-center gap-1">
                  {category?.name}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategoryChange(categoryId, false)} />
                </Badge>
              )
            })}
            {selectedBrands.map((brandId) => {
              const brand = brands.find((b) => b.id === brandId)
              return (
                <Badge key={brandId} variant="secondary" className="flex items-center gap-1">
                  {brand?.name}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleBrandChange(brandId, false)} />
                </Badge>
              )
            })}
            {(priceRange[0] > 0 || priceRange[1] < 1000) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                ${priceRange[0]} - ${priceRange[1]}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange([0, 1000])} />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="w-full" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <label
                htmlFor={category.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
              >
                {category.name}
              </label>
              <span className="text-xs text-muted-foreground">({category.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={brand.id}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
              />
              <label
                htmlFor={brand.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
              >
                {brand.name}
              </label>
              <span className="text-xs text-muted-foreground">({brand.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
