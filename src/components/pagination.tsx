import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination() {
  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <div className="flex items-center space-x-1">
        <button className="p-2 border rounded">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center border rounded bg-gray-100">1</button>
        <button className="w-8 h-8 flex items-center justify-center border rounded">2</button>
        <button className="w-8 h-8 flex items-center justify-center border rounded">3</button>
        <button className="w-8 h-8 flex items-center justify-center border rounded">4</button>
        <button className="w-8 h-8 flex items-center justify-center border rounded">5</button>
        <span className="px-2">...</span>
        <button className="w-8 h-8 flex items-center justify-center border rounded">20</button>
        <button className="p-2 border rounded">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
