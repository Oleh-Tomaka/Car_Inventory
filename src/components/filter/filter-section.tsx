import { ChevronDown } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  selectedCount?: number;
}

export function FilterSection({ title, isExpanded, onToggle, children, selectedCount = 0 }: FilterSectionProps) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">{title}</span>
          {selectedCount > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
              {selectedCount}
            </span>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isExpanded && <div className="pb-4">{children}</div>}
    </div>
  );
} 