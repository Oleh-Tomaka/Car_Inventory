"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Specifications() {
  return (
    <Accordion type="single" collapsible className="rounded-lg">
      <AccordionItem value="engine">
        <AccordionTrigger className="px-4">Engine and Transmission</AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Length</p>
              <p className="font-medium">4395mm</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Width</p>
              <p className="font-medium">2040mm</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="font-medium">1775mm</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Front Track</p>
              <p className="font-medium">1650mm</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rear Track</p>
              <p className="font-medium">1675mm</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kerb Weight</p>
              <p className="font-medium">2350</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
