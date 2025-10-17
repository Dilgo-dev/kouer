'use client';

import { useState } from 'react';
import type { Category, FilterState } from '@/types/product';

interface FilterSidebarProps {
  categories: Category[];
  onFilterChange: (filters: FilterState) => void;
  activeFilters: FilterState;
}

const LABELS = [
  { id: 'bio', name: 'BIO' },
  { id: 'label-rouge', name: 'Label Rouge' },
  { id: 'aoc', name: "Appellation d'origine contrôlée" },
  { id: 'produit-certifie', name: 'Produit certifié' },
  { id: 'stg', name: 'Spécialité traditionnelle garantie' },
  { id: 'igp', name: 'Indication géographique protégée' },
  { id: 'vbf', name: 'Viande bovine française' },
  { id: 'peche-durable', name: 'Pêche Durable' },
  { id: 'college-culinaire', name: 'Collège culinaire de France' },
];

export function FilterSidebar({ categories, onFilterChange, activeFilters }: FilterSidebarProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isLabelsOpen, setIsLabelsOpen] = useState(true);
  const [showAllLabels, setShowAllLabels] = useState(false);

  const displayedLabels = showAllLabels ? LABELS : LABELS.slice(0, 8);
  const hiddenLabelsCount = LABELS.length - 8;

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = activeFilters.selectedCategories.includes(categoryId)
      ? activeFilters.selectedCategories.filter((id) => id !== categoryId)
      : [...activeFilters.selectedCategories, categoryId];

    onFilterChange({
      ...activeFilters,
      selectedCategories: newCategories,
    });
  };

  const handleLabelToggle = (labelId: string) => {
    const newLabels = activeFilters.selectedLabels.includes(labelId)
      ? activeFilters.selectedLabels.filter((id) => id !== labelId)
      : [...activeFilters.selectedLabels, labelId];

    onFilterChange({
      ...activeFilters,
      selectedLabels: newLabels,
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      selectedCategories: [],
      selectedLabels: [],
    });
  };

  const hasActiveFilters = activeFilters.selectedCategories.length > 0 || activeFilters.selectedLabels.length > 0;

  return (
    <aside className="w-full lg:w-[360px] bg-white border-r border-gray-200">
      <div className="sticky top-0 p-5">
        {/* Active Filters Pills */}
        {hasActiveFilters && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              {activeFilters.priceRange && (
                <FilterPill
                  label={`${activeFilters.priceRange.min}€ - ${activeFilters.priceRange.max}€`}
                  onRemove={() => onFilterChange({ ...activeFilters, priceRange: undefined })}
                />
              )}
              {activeFilters.selectedLabels.map((labelId) => {
                const label = LABELS.find((l) => l.id === labelId);
                return label ? (
                  <FilterPill key={labelId} label={label.name} onRemove={() => handleLabelToggle(labelId)} />
                ) : null;
              })}
            </div>
            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Categories Section */}
        <div className="mb-8 border-b border-gray-200 pb-8">
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <h3 className="text-2xl font-normal text-gray-900">Categories</h3>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isCategoriesOpen && (
            <div className="space-y-3">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={activeFilters.selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <span className="flex-1 text-sm text-gray-700 group-hover:text-gray-900">
                    {category.name}
                  </span>
                  <span className="text-sm text-gray-500">{category.count}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Labels Section */}
        <div className="border-b border-gray-200 pb-8">
          <button
            onClick={() => setIsLabelsOpen(!isLabelsOpen)}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-normal text-gray-900">Labels</h3>
              {!showAllLabels && hiddenLabelsCount > 0 && (
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                  +{hiddenLabelsCount}
                </span>
              )}
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${isLabelsOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isLabelsOpen && (
            <>
              <div className="space-y-3 mb-4">
                {displayedLabels.map((label) => (
                  <label key={label.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={activeFilters.selectedLabels.includes(label.id)}
                      onChange={() => handleLabelToggle(label.id)}
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{label.name}</span>
                  </label>
                ))}
              </div>

              {!showAllLabels && hiddenLabelsCount > 0 && (
                <button
                  onClick={() => setShowAllLabels(true)}
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Show more
                </button>
              )}

              {showAllLabels && (
                <button
                  onClick={() => setShowAllLabels(false)}
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Show less
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

interface FilterPillProps {
  label: string;
  onRemove: () => void;
}

function FilterPill({ label, onRemove }: FilterPillProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-gray-100 rounded px-3 py-1.5">
      <span className="text-xs text-gray-800">{label}</span>
      <button
        onClick={onRemove}
        className="text-gray-600 hover:text-gray-900"
        aria-label={`Remove ${label} filter`}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
