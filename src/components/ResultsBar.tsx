import { SortDropdown } from './SortDropdown';
import type { SortOption } from '@/types/product';

interface ResultsBarProps {
  resultsCount: number;
  sortOptions: SortOption[];
  currentSort: string;
  onSortChange: (sortValue: string) => void;
  onFilterClick?: () => void;
  activeFiltersCount?: number;
}

export function ResultsBar({
  resultsCount,
  sortOptions,
  currentSort,
  onSortChange,
  onFilterClick,
  activeFiltersCount = 0
}: ResultsBarProps) {
  return (
    <div className="bg-white w-full px-[20px] py-[10px] flex items-center justify-between gap-[10px]">
      <div className="flex items-center gap-[5px]">
        <span
          className="font-poppins font-medium text-[16px] text-[#505050] leading-[0]"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          {resultsCount.toLocaleString('fr-FR')}
        </span>
        <span
          className="font-poppins font-normal text-[16px] text-[#858585] leading-[0]"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          results
        </span>
      </div>

      <div className="flex items-center gap-[10px]">
        {onFilterClick && (
          <button
            onClick={onFilterClick}
            className="lg:hidden bg-[#4ea04c] h-[35px] px-[20px] rounded-[60px] flex items-center justify-center gap-[5px]"
          >
            <span
              className="font-outfit font-normal text-[16px] text-white leading-normal whitespace-nowrap"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Filters
            </span>
            {activeFiltersCount > 0 && (
              <span
                className="font-outfit font-semibold text-[16px] text-white leading-normal"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                ({activeFiltersCount})
              </span>
            )}
          </button>
        )}
        <SortDropdown
          options={sortOptions}
          currentSort={currentSort}
          onSortChange={onSortChange}
        />
      </div>
    </div>
  );
}
