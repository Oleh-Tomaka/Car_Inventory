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
    <div className="p-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <div className="space-y-4"> */}
          <div className="relative">
            <Input
              id="vehicle-price"
              type="number"
              className="pt-8 h-[60px] rounded-[12px] focus-visible:border-2 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
            />
            <Label htmlFor="vehicle-price" className="absolute top-3 left-3 text-gray-400">Period (month)</Label>
          </div>
          <div className="relative">
            <Input
              id="vehicle-price"
              type="number"
              className="pt-8 h-[60px] rounded-[12px] focus-visible:border-2 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
            />
            <Label htmlFor="vehicle-price" className="absolute top-3 left-3 text-gray-400">Interest rate (%)</Label>
          </div>
          <div className="relative">
            <Input
              id="vehicle-price"
              type="number"
              className="pt-8 h-[60px] rounded-[12px] focus-visible:border-2 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
            <Label htmlFor="vehicle-price" className="absolute top-3 left-3 text-gray-400">Down Payment ($)</Label>
          </div>
          <div className="relative">
            <Input
              id="vehicle-price"
              type="number"
              className="pt-8 h-[60px] rounded-[12px] focus-visible:border-2 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
            />
            <Label htmlFor="vehicle-price" className="absolute top-3 left-3 text-gray-400">Loan Term (month)</Label>
          </div>
        {/* </div> */}
      </div>

      <div className="mt-6">
        <Button className="rounded-[12px]" style={{padding: '16px 70px'}}>
          Calculate
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <g clipPath="url(#clip0_215_9)">
              <path d="M17.4669 0.552368H6.93459C6.66997 0.552368 6.45583 0.7665 6.45583 1.03112C6.45583 1.29575 6.66997 1.50988 6.93459 1.50988H16.3112L0.851205 16.9698C0.664182 17.1568 0.664182 17.4598 0.851205 17.6468C0.944694 17.7403 1.06722 17.787 1.1897 17.787C1.31219 17.787 1.43467 17.7403 1.5282 17.6468L16.9881 2.18683V11.5634C16.9881 11.8281 17.2023 12.0422 17.4669 12.0422C17.7315 12.0422 17.9457 11.8281 17.9457 11.5634V1.03112C17.9456 0.7665 17.7315 0.552368 17.4669 0.552368Z" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_215_9">
                <rect width="17.2347" height="17.2347" fill="white" transform="translate(0.711426 0.552368)" />
              </clipPath>
            </defs>
          </svg>    
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 text-center">
        <div className="flex items-center md:justify-evenly justify-start gap-20 md:gap-0">
          <p className="text-sm text-muted-foreground">Monthly Payment</p>
          <p className="font-bold">${monthlyPayment.toFixed(2)}</p>
        </div>
        <div className="flex items-center md:justify-evenly justify-start gap-16 md:gap-0">
          <p className="text-sm text-muted-foreground">Total Amount to Pay</p>
          <p className="font-bold">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="flex items-center md:justify-evenly justify-start gap-12 md:gap-0">
          <p className="text-sm text-muted-foreground">Total Interest Payment</p>
          <p className="font-bold">${totalInterest.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
