import { Navigation } from "@/components/navigation"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// This would typically come from a database or API
const getProduct = (id: string) => {
  return {
    id: Number.parseInt(id),
    name: "Premium Wireless Headphones",
    brand: "TechSound",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1250,
    images: [
      "/placeholder.svg?key=pd1",
      "/placeholder.svg?key=pd2",
      "/placeholder.svg?key=pd3",
      "/placeholder.svg?key=pd4",
    ],
    category: "Electronics",
    description:
      "Experience premium sound quality with our latest wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort design.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium comfort design",
      "Bluetooth 5.0 connectivity",
      "Quick charge: 15 min = 3 hours playback",
      "Compatible with voice assistants",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 ohms",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      Battery: "30 hours (ANC off), 20 hours (ANC on)",
    },
    inStock: true,
    stockCount: 15,
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id)

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ProductDetails product={product} />
        <RelatedProducts currentProductId={product.id} />
      </main>
    </div>
  )
}
