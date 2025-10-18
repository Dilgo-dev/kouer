import Image from "next/image";
import type { Product } from "@/types/product";
import { LabelType } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

interface LabelConfig {
  text: string;
  icon?: string;
  textClass?: string;
  fontWeight?: "normal" | "semibold";
}

const labelConfig: Record<LabelType, LabelConfig | undefined> = {
  [LabelType.BIO]: { text: "BIO", icon: "/logo/bio.png" },
  [LabelType.STG]: { text: "STG", icon: "/logo/stg.png" },
  [LabelType.SEASONAL]: {
    text: "Produit de saison",
    textClass: "text-primary",
    fontWeight: "semibold"
  },
  [LabelType.LABEL_ROUGE]: undefined,
  [LabelType.AOC]: undefined,
  [LabelType.PRODUIT_CERTIFIE]: undefined,
  [LabelType.IGP]: undefined,
  [LabelType.VBF]: undefined,
  [LabelType.PECHE_DURABLE]: undefined,
  [LabelType.COLLEGE_CULINAIRE]: undefined,
};

export function ProductCard({ product }: ProductCardProps) {
  const visibleLabels = product.labels
    .filter((label) => labelConfig[label.type])
    .slice(0, 2);

  return (
    <article className="bg-white rounded-[10px] overflow-hidden flex flex-col shadow-card">
      <div className="relative h-[240px] w-full overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
        />
        <div className="absolute inset-0 p-[20px] flex flex-col gap-[10px] z-10">
          {visibleLabels.map((label) => {
            const config = labelConfig[label.type];
            if (!config) return null;

            return <ProductLabelBadge key={label.id} config={config} />;
          })}
        </div>
      </div>

      <div className="bg-white p-[18px] flex">
        <h3
          className="flex-1 font-poppins font-semibold text-sm text-neutral-600 leading-normal h-[48px] overflow-hidden line-clamp-2"
          style={{
            fontFamily: "var(--font-poppins)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </h3>
      </div>
    </article>
  );
}

interface ProductLabelBadgeProps {
  config: LabelConfig;
}

function ProductLabelBadge({ config }: ProductLabelBadgeProps) {
  const hasIcon = Boolean(config.icon);
  const textClass = config.textClass ?? "text-neutral-600";
  const fontWeight = config.fontWeight ?? "normal";

  return (
    <div
      className={`bg-white flex gap-[5px] items-center py-[3px] rounded-[20px] w-fit ${
        hasIcon ? "pl-[3px] pr-[8px]" : "px-[10px]"
      }`}
    >
      {hasIcon && (
        <div className="relative size-[20px] shrink-0">
          <Image
            src={config.icon!}
            alt={config.text}
            fill
            className="object-contain"
          />
        </div>
      )}
      <p
        className={`font-poppins text-[12px] leading-normal whitespace-nowrap ${textClass} ${
          fontWeight === "semibold" ? "font-semibold" : ""
        }`}
      >
        {config.text}
      </p>
    </div>
  );
}
