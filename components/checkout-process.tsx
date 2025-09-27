"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Truck, CreditCard, Shield, Check, ArrowLeft, ArrowRight } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

interface CheckoutData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  shippingMethod: string
  paymentMethod: string
  cardNumber: string
  expiryDate: string
  cvv: string
  nameOnCard: string
  billingAddressSame: boolean
}

export function CheckoutProcess() {
  const { state, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState("")

  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    phone: "",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    billingAddressSame: true,
  })

  const shipping = state.total >= 50 ? 0 : 9.99
  const tax = state.total * 0.08
  const shippingCost = checkoutData.shippingMethod === "express" ? 19.99 : shipping
  const finalTotal = state.total + shippingCost + tax

  const updateCheckoutData = (field: keyof CheckoutData, value: string | boolean) => {
    setCheckoutData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          checkoutData.email &&
          checkoutData.firstName &&
          checkoutData.lastName &&
          checkoutData.address &&
          checkoutData.city &&
          checkoutData.state &&
          checkoutData.zipCode &&
          checkoutData.phone
        )
      case 2:
        return !!checkoutData.shippingMethod
      case 3:
        if (checkoutData.paymentMethod === "card") {
          return !!(checkoutData.cardNumber && checkoutData.expiryDate && checkoutData.cvv && checkoutData.nameOnCard)
        }
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newOrderId = `ORD-${Date.now()}`
    setOrderId(newOrderId)
    setOrderComplete(true)
    clearCart()
    setIsProcessing(false)
  }

  if (state.items.length === 0 && !orderComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground text-lg">Add some items to your cart before proceeding to checkout.</p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Order Number:</span>
                <span className="font-mono">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold">${finalTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Estimated Delivery:</span>
                <span>3-5 business days</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step < currentStep ? <Check className="w-4 h-4" /> : step}
              </div>
              {step < 4 && <div className={`w-12 h-0.5 mx-2 ${step < currentStep ? "bg-accent" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-8 text-sm text-muted-foreground mb-8">
          <span className={currentStep >= 1 ? "text-foreground font-medium" : ""}>Shipping Info</span>
          <span className={currentStep >= 2 ? "text-foreground font-medium" : ""}>Delivery</span>
          <span className={currentStep >= 3 ? "text-foreground font-medium" : ""}>Payment</span>
          <span className={currentStep >= 4 ? "text-foreground font-medium" : ""}>Review</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={checkoutData.email}
                      onChange={(e) => updateCheckoutData("email", e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={checkoutData.firstName}
                        onChange={(e) => updateCheckoutData("firstName", e.target.value)}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={checkoutData.lastName}
                        onChange={(e) => updateCheckoutData("lastName", e.target.value)}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={checkoutData.address}
                      onChange={(e) => updateCheckoutData("address", e.target.value)}
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={checkoutData.city}
                        onChange={(e) => updateCheckoutData("city", e.target.value)}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select value={checkoutData.state} onValueChange={(value) => updateCheckoutData("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={checkoutData.zipCode}
                        onChange={(e) => updateCheckoutData("zipCode", e.target.value)}
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={checkoutData.phone}
                        onChange={(e) => updateCheckoutData("phone", e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleNext}
                    disabled={!validateStep(1)}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Continue to Delivery
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Delivery Options */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Delivery Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={checkoutData.shippingMethod}
                  onValueChange={(value) => updateCheckoutData("shippingMethod", value)}
                >
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                    <RadioGroupItem value="standard" id="standard" />
                    <div className="flex-1">
                      <Label htmlFor="standard" className="font-medium">
                        Standard Delivery
                      </Label>
                      <p className="text-sm text-muted-foreground">5-7 business days</p>
                    </div>
                    <span className="font-medium">{shipping === 0 ? "Free" : "$9.99"}</span>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                    <RadioGroupItem value="express" id="express" />
                    <div className="flex-1">
                      <Label htmlFor="express" className="font-medium">
                        Express Delivery
                      </Label>
                      <p className="text-sm text-muted-foreground">2-3 business days</p>
                    </div>
                    <span className="font-medium">$19.99</span>
                  </div>
                </RadioGroup>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Continue to Payment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Payment Information */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={checkoutData.paymentMethod}
                  onValueChange={(value) => updateCheckoutData("paymentMethod", value)}
                >
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="font-medium">
                      Credit/Debit Card
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="font-medium">
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>

                {checkoutData.paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        value={checkoutData.nameOnCard}
                        onChange={(e) => updateCheckoutData("nameOnCard", e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={checkoutData.cardNumber}
                        onChange={(e) => updateCheckoutData("cardNumber", e.target.value)}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={checkoutData.expiryDate}
                          onChange={(e) => updateCheckoutData("expiryDate", e.target.value)}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={checkoutData.cvv}
                          onChange={(e) => updateCheckoutData("cvv", e.target.value)}
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="billingAddressSame"
                        checked={checkoutData.billingAddressSame}
                        onCheckedChange={(checked) => updateCheckoutData("billingAddressSame", checked as boolean)}
                      />
                      <Label htmlFor="billingAddressSame" className="text-sm">
                        Billing address same as shipping address
                      </Label>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!validateStep(3)}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Review Order
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Order Review */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Review Your Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        {checkoutData.firstName} {checkoutData.lastName}
                      </p>
                      <p>{checkoutData.address}</p>
                      <p>
                        {checkoutData.city}, {checkoutData.state} {checkoutData.zipCode}
                      </p>
                      <p>{checkoutData.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Delivery Method</h4>
                    <p className="text-sm text-muted-foreground">
                      {checkoutData.shippingMethod === "standard"
                        ? "Standard Delivery (5-7 days)"
                        : "Express Delivery (2-3 days)"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <p className="text-sm text-muted-foreground">
                      {checkoutData.paymentMethod === "card"
                        ? `Card ending in ${checkoutData.cardNumber.slice(-4)}`
                        : "PayPal"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium text-sm">Secure Checkout</p>
                  <p className="text-xs text-muted-foreground">Your payment info is protected</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium text-sm">Free Returns</p>
                  <p className="text-xs text-muted-foreground">30-day return policy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
