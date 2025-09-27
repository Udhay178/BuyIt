"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingCart, Star, Minus, Plus, Share, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  images: string[]
  category: string
  description: string
  features: string[]
  specifications: Record<string, string>
  inStock: boolean
  stockCount: number
}

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  const discountPercentage = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.images[0],
        maxStock: product.stockCount,
      })
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
          <img
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                selectedImage === index ? "border-accent" : "border-border"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground mb-2">{product.brand}</p>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                <Badge variant="destructive">{discountPercentage}% OFF</Badge>
              </>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
          <span className={product.inStock ? "text-green-600" : "text-red-600"}>
            {product.inStock ? `In Stock (${product.stockCount} available)` : "Out of Stock"}
          </span>
        </div>

        {/* Quantity and Actions */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                disabled={quantity >= product.stockCount}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              size="lg"
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" onClick={() => setIsWishlisted(!isWishlisted)}>
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
            </Button>
            <Button variant="outline" size="lg">
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Guarantees */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 border border-border rounded-lg">
            <Truck className="w-6 h-6 mx-auto mb-2 text-accent" />
            <p className="text-sm font-medium">Free Shipping</p>
            <p className="text-xs text-muted-foreground">On orders over $50</p>
          </div>
          <div className="text-center p-4 border border-border rounded-lg">
            <Shield className="w-6 h-6 mx-auto mb-2 text-accent" />
            <p className="text-sm font-medium">2 Year Warranty</p>
            <p className="text-xs text-muted-foreground">Full coverage</p>
          </div>
          <div className="text-center p-4 border border-border rounded-lg">
            <RotateCcw className="w-6 h-6 mx-auto mb-2 text-accent" />
            <p className="text-sm font-medium">30-Day Returns</p>
            <p className="text-xs text-muted-foreground">No questions asked</p>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="lg:col-span-2">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Reviews component would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Shipping Information</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Free standard shipping on orders over $50</li>
                      <li>• Express shipping available for $9.99</li>
                      <li>• International shipping available</li>
                      <li>• Orders processed within 1-2 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Return Policy</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 30-day return window</li>
                      <li>• Items must be in original condition</li>
                      <li>• Free return shipping</li>
                      <li>• Refunds processed within 5-7 business days</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
