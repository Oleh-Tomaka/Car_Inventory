"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FinancingCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(25000)
  const [downPayment, setDownPayment] = useState(5000)
  const [interestRate, setInterestRate] = useState(4)
  const [loanTerm, setLoanTerm] = useState(60)

  const calculateMonthlyPayment = () => {
    const principal = vehiclePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1)
    return isNaN(monthlyPayment) ? 0 : monthlyPayment
  }

  const monthlyPayment = calculateMonthlyPayment()
  const totalAmount = monthlyPayment * loanTerm
  const totalInterest = totalAmount - (vehiclePrice - downPayment)

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">Financing Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="vehicle-price">Vehicle Price (USD)</Label>
            <Input
              id="vehicle-price"
              type="number"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="down-payment">Down Payment ($)</Label>
            <Input
              id="down-payment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="interest-rate">Interest Rate (%)</Label>
            <Input
              id="interest-rate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="loan-term">Loan Term (months)</Label>
            <Input
              id="loan-term"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button className="w-full">Calculate</Button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-muted-foreground">Monthly Payment</p>
          <p className="font-bold">${monthlyPayment.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Amount to Pay</p>
          <p className="font-bold">${totalAmount.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Interest Payment</p>
          <p className="font-bold">${totalInterest.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
