"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Star, Grid3X3, List } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    brand: "TechSound",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1250,
    image: "/placeholder.svg?key=p1",
    category: "Electronics",
    isNew: false,
    isSale: true,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    brand: "FitTech",
    price: 199.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 890,
    image: "/placeholder.svg?key=p2",
    category: "Electronics",
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Designer Running Shoes",
    brand: "SportMax",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviews: 2100,
    image: "/placeholder.svg?key=p3",
    category: "Fashion",
    isNew: false,
    isSale: true,
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    brand: "EcoWear",
    price: 29.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 650,
    image: "/placeholder.svg?key=p4",
    category: "Fashion",
    isNew: false,
    isSale: false,
  },
  {
    id: 5,
    name: "Smart Home Speaker",
    brand: "VoiceTech",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.4,
    reviews: 1800,
    image: "/placeholder.svg?key=p5",
    category: "Electronics",
    isNew: false,
    isSale: true,
  },
  {
    id: 6,
    name: "Minimalist Desk Lamp",
    brand: "ModernLight",
    price: 79.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 420,
    image: "/placeholder.svg?key=p6",
    category: "Home",
    isNew: true,
    isSale: false,
  },
]

export function ProductGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const { addItem } = useCart()

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      maxStock: 10,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">All Products</h1>
          <p className="text-muted-foreground">Showing {products.length} of 12,500 products</p>
        </div>

        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && <Badge className="bg-accent text-accent-foreground">New</Badge>}
                  {product.isSale && <Badge variant="destructive">Sale</Badge>}
                </div>

                {/* Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="w-8 h-8">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Add to Cart */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold hover:text-accent transition-colors line-clamp-2">{product.name}</h3>
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                  {product.originalPrice && (
                    <Badge variant="outline" className="text-xs">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>
    </div>
  )
}
