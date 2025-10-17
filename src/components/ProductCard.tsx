import Image from 'next/image';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex flex-col bg-white hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative aspect-[293/260] overflow-hidden bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
        />

        {/* Labels Overlay */}
        {product.labels.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.labels.slice(0, 2).map((label) => (
              <span
                key={label.id}
                className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800"
              >
                {label.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-2 p-5">
        <h3 className="text-base font-normal leading-6 text-gray-900 line-clamp-2 min-h-[48px]">
          {product.name}
        </h3>
      </div>
    </article>
  );
}
