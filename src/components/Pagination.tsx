"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = buildPageSequence(currentPage, totalPages);

  return (
    <nav
      className="flex items-center justify-center gap-[10px] p-[10px]"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-[#f4f4f4] rounded-[37.5px] w-[25px] h-[25px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#e4e4e4]"
        aria-label="Previous page"
      >
        <svg
          width="18.75"
          height="18.75"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.875 14.25L7.125 9.5L11.875 4.75"
            stroke="#333333"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {pages.map((page, index) => (
        <PaginationItem
          key={typeof page === "number" ? page : `ellipsis-${index}`}
          page={page}
          isActive={typeof page === "number" && page === currentPage}
          onSelect={onPageChange}
        />
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-[#f4f4f4] rounded-[37.5px] w-[25px] h-[25px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#e4e4e4]"
        aria-label="Next page"
      >
        <svg
          width="18.75"
          height="18.75"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.125 4.75L11.875 9.5L7.125 14.25"
            stroke="#333333"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </nav>
  );
}

type PageEntry = number | "...";

function buildPageSequence(currentPage: number, totalPages: number): PageEntry[] {
  const pages: PageEntry[] = [];
  const maxVisible = 7;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  if (currentPage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

interface PaginationItemProps {
  page: PageEntry;
  isActive: boolean;
  onSelect: (page: number) => void;
}

function PaginationItem({ page, isActive, onSelect }: PaginationItemProps) {
  if (page === "...") {
    return (
      <div className="bg-white h-[40px] flex flex-col items-center justify-center px-[10px]">
        <p
          className="font-poppins font-medium text-[20px] text-[#aaaaaa] leading-[0]"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          ...
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelect(page)}
      className="bg-white h-[40px] flex flex-col items-center justify-center px-[10px] relative hover:bg-gray-50 transition-colors"
      aria-current={isActive ? "page" : undefined}
    >
      <p
        className={`font-poppins font-medium text-[20px] ${
          isActive ? "text-[#4ea04c]" : "text-[#aaaaaa]"
        }`}
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {page}
      </p>
      {isActive && (
        <div className="w-[5px] h-[5px] bg-[#4ea04c] rounded-full mt-[2px]" />
      )}
    </button>
  );
}
