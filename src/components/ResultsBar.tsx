import { SortDropdown } from './SortDropdown';
import type { SortOption } from '@/types/product';

interface ResultsBarProps {
  resultsCount: number;
  sortOptions: SortOption[];
  currentSort: string;
  onSortChange: (sortValue: string) => void;
}

export function ResultsBar({ resultsCount, sortOptions, currentSort, onSortChange }: ResultsBarProps) {
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
          résultats
        </span>
      </div>
      <SortDropdown
        options={sortOptions}
        currentSort={currentSort}
        onSortChange={onSortChange}
      />
    </div>
  );
}
