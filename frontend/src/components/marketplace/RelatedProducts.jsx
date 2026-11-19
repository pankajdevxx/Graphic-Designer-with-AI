import React from 'react';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';
import { getRelatedProducts } from '../../data/marketplaceProducts';

/**
 * RelatedProducts Component
 * Recommends companion design assets from the same design category.
 */
export const RelatedProducts = ({ currentProductId, categorySlug, title = 'Related Design Assets' }) => {
  const related = getRelatedProducts(currentProductId, categorySlug, 4);

  if (related.length === 0) return null;

  return (
    <div className="space-y-6 pt-12 border-t border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-purple-400" />
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {title}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
