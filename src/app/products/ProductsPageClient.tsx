"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import { ProductsHeader } from "@/components/ProductsHeader";
import { ResultsBar } from "@/components/ResultsBar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { FilterOverlay } from "@/components/FilterOverlay";
import { Pagination } from "@/components/Pagination";
import type {
  Category,
  FilterLabelOption,
  FilterState,
  Product,
  SortOption,
} from "@/types/product";

const PRODUCTS_PER_PAGE = 30;

const SORT_OPTIONS: SortOption[] = [
  { id: "relevance", label: "Pertinence", value: "relevance" },
  { id: "newest", label: "Nouveauté", value: "newest" },
  { id: "price-asc", label: "Prix croissant", value: "price-asc" },
  { id: "price-desc", label: "Prix décroissant", value: "price-desc" },
  { id: "rating", label: "Meilleures notes", value: "rating" },
];

interface ProductsPageClientProps {
  initialProducts: Product[];
  categories: Category[];
  labels: FilterLabelOption[];
}

export function ProductsPageClient({
  initialProducts,
  categories,
  labels,
}: ProductsPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption["value"]>("relevance");
  const [filters, setFilters] = useState<FilterState>({
    selectedCategories: [],
    selectedLabels: [],
  });
  const [isFilterOverlayOpen, setIsFilterOverlayOpen] = useState(false);

  const allProducts = useMemo(() => initialProducts, [initialProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    const workingList = [...allProducts];

    let filtered = workingList;

    if (filters.selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.selectedCategories.includes(product.category)
      );
    }

    if (filters.selectedLabels.length > 0) {
      filtered = filtered.filter((product) => {
        if (filters.selectedLabels.includes("bio") && product.isBio) {
          return true;
        }

        if (
          filters.selectedLabels.includes("label-rouge") &&
          product.isLabelRouge
        ) {
          return true;
        }

        return product.labels.some((label) =>
          filters.selectedLabels.includes(label.id)
        );
      });
    }

    if (filters.priceRange) {
      filtered = filtered.filter(
        (product) =>
          product.price >= filters.priceRange!.min &&
          product.price <= filters.priceRange!.max
      );
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "newest": {
        const getTimestamp = (product: Product) => {
          if (product.createdAt) {
            return new Date(product.createdAt).getTime();
          }
          const parsedId = Number(product.id);
          return Number.isNaN(parsedId) ? 0 : parsedId;
        };

        filtered.sort((a, b) => getTimestamp(b) - getTimestamp(a));
        break;
      }
      default:
        break;
    }

    return filtered;
  }, [allProducts, filters, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE)
  );

  const paginatedProducts = useMemo(() => {
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * PRODUCTS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [filteredAndSortedProducts, currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const activeFiltersCount =
    filters.selectedCategories.length +
    filters.selectedLabels.length +
    (filters.priceRange ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductsHeader />

      <ResultsBar
        resultsCount={filteredAndSortedProducts.length}
        sortOptions={SORT_OPTIONS}
        currentSort={sortBy}
        onSortChange={setSortBy}
        onFilterClick={() => setIsFilterOverlayOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      <FilterOverlay
        isOpen={isFilterOverlayOpen}
        onClose={() => setIsFilterOverlayOpen(false)}
        categories={categories}
        labels={labels}
        onFilterChange={handleFilterChange}
        activeFilters={filters}
      />

      <div className="flex flex-col lg:flex-row bg-white">
        <FilterSidebar
          categories={categories}
          labels={labels}
          onFilterChange={handleFilterChange}
          activeFilters={filters}
        />

        <main className="flex-1">
          <div className="p-5">
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-3">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="text-center">
                  <svg
                    className="mx-auto h-16 w-16 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                  <h3 className="mt-6 font-poppins text-xl font-semibold text-neutral-800">
                    Aucun produit trouvé
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500 max-w-md mx-auto">
                    Essayez d&apos;ajuster vos filtres pour voir plus de
                    résultats.
                  </p>
                </div>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="py-10 px-5">
              <Pagination
                currentPage={Math.min(currentPage, totalPages)}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
