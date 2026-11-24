import React from 'react';
import ProductCard from './ProductCard';
import LoadingSkeleton from './LoadingSkeleton';
import SecondaryButton from '../ui/SecondaryButton';
import { Search } from 'lucide-react';

/**
 * ProductGrid Component
 * Renders an animated grid of ProductCard items with graceful loading and empty state fallbacks.
 */
export const ProductGrid = ({
  products = [],
  loading = false,
  isLoading = false,
  columns = 4,
  emptyMessage = 'No creative design products match your active search and filter criteria.',
  onResetFilters,
}) => {
  const isBusy = loading || isLoading;
  if (isBusy) {
    return <LoadingSkeleton count={8} />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 px-6 rounded-3xl bg-[#12092b]/30 border border-white/8 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-purple-950/50 border border-purple-500/30 text-purple-400 mx-auto flex items-center justify-center mb-4">
          <Search size={28} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Matching Assets Found</h3>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          {emptyMessage}
        </p>
        {onResetFilters && (
          <SecondaryButton onClick={onResetFilters} className="mx-auto">
            Clear All Active Filters
          </SecondaryButton>
        )}
      </div>
    );
  }

  const gridColsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={`grid ${gridColsClass} gap-6 sm:gap-8`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
