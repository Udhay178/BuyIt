import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "Electronics",
    description: "Latest gadgets and tech",
    image: "/modern-electronics.png",
    itemCount: "2,500+ items",
  },
  {
    name: "Fashion",
    description: "Trendy clothing and accessories",
    image: "/fashion-clothing-and-accessories.jpg",
    itemCount: "5,000+ items",
  },
  {
    name: "Home & Garden",
    description: "Everything for your home",
    image: "/home-decor-and-garden-items.jpg",
    itemCount: "3,200+ items",
  },
  {
    name: "Sports",
    description: "Gear for active lifestyle",
    image: "/sports-equipment-and-gear.jpg",
    itemCount: "1,800+ items",
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Shop by Category</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Explore our carefully curated categories to find exactly what you're looking for
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-accent font-medium">{category.itemCount}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-accent group-hover:text-accent-foreground"
                    >
                      Browse
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
