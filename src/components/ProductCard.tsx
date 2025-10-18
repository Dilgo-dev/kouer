import Image from 'next/image';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="bg-white rounded-[10px] overflow-hidden flex flex-col shadow-[4px_4px_20px_0px_rgba(0,0,0,0.1)]">
      <div className="relative h-[260px] w-full overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
        />
        <div className="absolute inset-0 p-[20px] flex flex-col gap-[10px] z-10" />
      </div>

      <div className="bg-white p-[20px] flex gap-[10px]">
        <h3
          className="flex-1 font-poppins font-semibold text-[16px] text-[#505050] leading-normal h-[48px] overflow-hidden line-clamp-2"
          style={{
            fontFamily: 'var(--font-poppins)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {product.name}
        </h3>
      </div>
    </article>
  );
}
