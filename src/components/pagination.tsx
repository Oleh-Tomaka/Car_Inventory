import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination() {
  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <div className="flex items-center space-x-2">
        <button className="px-4 py-2 border border-black rounded-full">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full">1</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white">2</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full">3</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full">4</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full">5</button>
        <span className="px-2">...</span>
        <button className="w-8 h-8 flex items-center justify-center rounded-full">20</button>
        <button className="px-4 py-2 border rounded-full">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
