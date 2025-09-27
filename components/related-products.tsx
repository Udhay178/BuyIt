import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"

const relatedProducts = [
  {
    id: 2,
    name: "Smart Fitness Watch",
    brand: "FitTech",
    price: 199.99,
    rating: 4.6,
    reviews: 890,
    image: "/placeholder.svg?key=rp1",
  },
  {
    id: 5,
    name: "Smart Home Speaker",
    brand: "VoiceTech",
    price: 89.99,
    rating: 4.4,
    reviews: 1800,
    image: "/placeholder.svg?key=rp2",
  },
  {
    id: 7,
    name: "Wireless Charging Pad",
    brand: "PowerTech",
    price: 49.99,
    rating: 4.3,
    reviews: 650,
    image: "/placeholder.svg?key=rp3",
  },
  {
    id: 8,
    name: "Bluetooth Earbuds",
    brand: "AudioMax",
    price: 129.99,
    rating: 4.7,
    reviews: 1200,
    image: "/placeholder.svg?key=rp4",
  },
]

interface RelatedProductsProps {
  currentProductId: number
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const filteredProducts = relatedProducts.filter((product) => product.id !== currentProductId)

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-8">You might also like</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold hover:text-accent transition-colors line-clamp-2">{product.name}</h3>
                </Link>

                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                <p className="text-lg font-bold">${product.price}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
