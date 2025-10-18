import Image from "next/image";
import { SortDropdown } from "./SortDropdown";
import type { SortOption, SortValue } from "@/types/product";

interface ResultsBarProps {
  resultsCount: number;
  sortOptions: SortOption[];
  currentSort: SortValue;
  onSortChange: (sortValue: SortValue) => void;
  onFilterClick?: () => void;
  activeFiltersCount?: number;
}

export function ResultsBar({
  resultsCount,
  sortOptions,
  currentSort,
  onSortChange,
  onFilterClick,
  activeFiltersCount = 0,
}: ResultsBarProps) {
  return (
    <div className="bg-white w-full px-[20px] py-[10px] flex items-center justify-between gap-[10px] border-b border-border">
      <div className="hidden md:flex items-center gap-[5px]">
        <span
          className="font-poppins font-medium text-[16px] text-neutral-600 leading-[0]"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {resultsCount.toLocaleString("fr-FR")}
        </span>
        <span
          className="font-poppins font-normal text-[16px] text-neutral-500 leading-[0]"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          résultats
        </span>
      </div>

      <div className="flex items-center gap-[10px] w-full justify-between md:justify-end">
        <SortDropdown
          options={sortOptions}
          currentSort={currentSort}
          onSortChange={onSortChange}
        />
        {onFilterClick && (
          <>
            <button
              onClick={onFilterClick}
              className="hidden md:flex lg:hidden bg-primary h-[44px] pl-[25px] pr-[20px] rounded-[60px] items-center justify-center gap-[10px]"
            >
              <span
                className="font-poppins font-medium text-[16px] text-primary-foreground leading-normal whitespace-nowrap"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Filtres {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </span>
              <Image
                src="/icons/rivet.svg"
                alt="Filtres"
                width={16}
                height={16}
              />
            </button>
            <button
              onClick={onFilterClick}
              className="md:hidden bg-primary w-[44px] h-[44px] rounded-full flex items-center justify-center"
            >
              <Image
                src="/icons/rivet.svg"
                alt="Filtres"
                width={16}
                height={16}
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
