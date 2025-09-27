import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Trusted by 50,000+ customers</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Premium shopping
                <span className="text-accent"> made simple</span>
              </h1>

              <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                Discover curated products from top brands with fast shipping, secure payments, and exceptional customer
                service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg">
                Browse Categories
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">10K+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 p-8">
              <img
                src="/modern-ecommerce-hero-image-with-shopping-bags-and.jpg"
                alt="Premium shopping experience"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-card border border-border rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-full"></div>
                <div>
                  <div className="text-sm font-medium">Free Shipping</div>
                  <div className="text-xs text-muted-foreground">On orders $50+</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-full"></div>
                <div>
                  <div className="text-sm font-medium">24/7 Support</div>
                  <div className="text-xs text-muted-foreground">Always here to help</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
