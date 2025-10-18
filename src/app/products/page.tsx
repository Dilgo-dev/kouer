"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductsHeader } from "@/components/ProductsHeader";
import { ResultsBar } from "@/components/ResultsBar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { FilterOverlay } from "@/components/FilterOverlay";
import { Pagination } from "@/components/Pagination";
import { generateProducts, MOCK_CATEGORIES } from "@/data/mockProducts";
import type { FilterState, SortOption } from "@/types/product";

const PRODUCTS_PER_PAGE = 30;
const TOTAL_PRODUCTS = 1465;

const SORT_OPTIONS: SortOption[] = [
  { id: "relevance", label: "Pertinence", value: "relevance" },
  { id: "newest", label: "Nouveauté", value: "newest" },
  { id: "price-asc", label: "Prix croissant", value: "price-asc" },
  { id: "price-desc", label: "Prix décroissant", value: "price-desc" },
  { id: "rating", label: "Meilleures notes", value: "rating" },
];

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [filters, setFilters] = useState<FilterState>({
    selectedCategories: [],
    selectedLabels: [],
  });
  const [isFilterOverlayOpen, setIsFilterOverlayOpen] = useState(false);

  const allProducts = useMemo(() => generateProducts(TOTAL_PRODUCTS), []);

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Apply category filters
    if (filters.selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.selectedCategories.includes(product.category)
      );
    }

    // Apply label filters
    if (filters.selectedLabels.length > 0) {
      filtered = filtered.filter((product) => {
        if (filters.selectedLabels.includes("bio") && product.isBio)
          return true;
        if (
          filters.selectedLabels.includes("label-rouge") &&
          product.isLabelRouge
        )
          return true;
        return product.labels.some((label) =>
          filters.selectedLabels.includes(label.id)
        );
      });
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(
        (product) =>
          product.price >= filters.priceRange!.min &&
          product.price <= filters.priceRange!.max
      );
    }

    // Apply sorting
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
      default:
        // relevance - keep original order
        break;
    }

    return filtered;
  }, [allProducts, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PRODUCTS_PER_PAGE
  );
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [filteredAndSortedProducts, currentPage]);

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
        categories={MOCK_CATEGORIES}
        onFilterChange={handleFilterChange}
        activeFilters={filters}
      />

      <div className="flex flex-col lg:flex-row bg-white">
        <FilterSidebar
          categories={MOCK_CATEGORIES}
          onFilterChange={handleFilterChange}
          activeFilters={filters}
        />

        <main className="flex-1">
          <div className="p-5">
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    Aucun produit trouvé
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Essayez d'ajuster vos filtres pour voir plus de résultats.
                  </p>
                </div>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="py-10 px-5">
              <Pagination
                currentPage={currentPage}
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
