import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Shield, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity, addToCart } = useCart();
  const { showToast } = useToast();
  const { product, licenseType, quantity } = item;

  const handleRemove = () => {
    removeFromCart(product.id);
    showToast(`Removed "${product.title}" from your cart`, 'info');
  };

  const handleLicenseChange = (e) => {
    const newLicense = e.target.value;
    addToCart(product, newLicense);
    showToast(`License updated to ${newLicense} for "${product.title}"`, 'success');
  };

  const priceMultiplier = licenseType === 'Extended' ? 2.5 : 1;
  const unitPrice = Math.round(product.price * priceMultiplier);
  const itemTotal = unitPrice * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#12092b]/70 border border-purple-500/20 backdrop-blur-md hover:border-purple-500/40 transition-all duration-300 gap-4">
      {/* Product Image & Title */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Link
          to={`/marketplace/product/${product.slug}`}
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-purple-500/30 group"
        >
          <img
            src={product.previewImages?.[0] || product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium text-purple-400 uppercase tracking-wider block">
            {product.category}
          </span>
          <Link
            to={`/marketplace/product/${product.slug}`}
            className="text-base sm:text-lg font-semibold text-white hover:text-purple-300 transition-colors line-clamp-1 block"
          >
            {product.title}
          </Link>

          {/* License Selector Dropdown */}
          <div className="mt-2 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <select
              value={licenseType}
              onChange={handleLicenseChange}
              aria-label={`Select license for ${product.title}`}
              className="text-xs bg-[#0b051a] border border-purple-500/30 text-purple-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-purple-400 cursor-pointer"
            >
              <option value="Standard">Standard License (1x)</option>
              <option value="Extended">Extended Commercial (2.5x)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pricing, Quantity Controls & Remove */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-purple-500/10">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2 bg-[#0a0418] border border-purple-500/30 rounded-xl px-2 py-1">
          <button
            onClick={() => updateQuantity(product.id, -1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="w-6 h-6 flex items-center justify-center text-purple-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-sm font-semibold text-white px-1.5">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, 1)}
            aria-label="Increase quantity"
            className="w-6 h-6 flex items-center justify-center text-purple-300 hover:text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[80px]">
          <div className="text-lg font-bold text-white tracking-tight">
            ${itemTotal}
          </div>
          {quantity > 1 && (
            <div className="text-xs text-purple-400">
              ${unitPrice} each
            </div>
          )}
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          aria-label={`Remove ${product.title} from cart`}
          className="p-2 rounded-xl text-purple-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          title="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;