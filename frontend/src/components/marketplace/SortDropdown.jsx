import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

/**
 * SortDropdown Component
 * Dropdown selector for sorting marketplace product results.
 * Supports both value/onChange and sortBy/onSortChange props.
 */
export const SortDropdown = ({
  value,
  sortBy,
  onChange,
  onSortChange,
  className = '',
}) => {
  const currentValue = sortBy || value || 'popular';

  const options = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'highest-rated', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  const handleSelection = (newVal) => {
    if (onSortChange) {
      onSortChange(newVal);
    }
    if (onChange) {
      onChange(newVal);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <SlidersHorizontal size={14} className="text-purple-400 shrink-0" />
      <select
        value={currentValue}
        onChange={(e) => handleSelection(e.target.value)}
        className="px-3.5 py-2 rounded-xl bg-[#12092b]/80 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-purple-400 cursor-pointer shadow-md transition-all hover:border-purple-500/40"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0e0622] text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
