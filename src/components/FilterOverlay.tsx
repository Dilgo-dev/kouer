"use client";

import { useState } from "react";
import Image from "next/image";
import { FILTER_LABEL_OPTIONS } from "@/data/filterLabels";
import type {
  Category,
  FilterState,
  FilterLabelOption,
} from "@/types/product";

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onFilterChange: (filters: FilterState) => void;
  activeFilters: FilterState;
}

export function FilterOverlay({
  isOpen,
  onClose,
  categories,
  onFilterChange,
  activeFilters,
}: FilterOverlayProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isLabelsOpen, setIsLabelsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  const activeFiltersCount =
    activeFilters.selectedCategories.length +
    activeFilters.selectedLabels.length +
    (activeFilters.priceRange ? 1 : 0);

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

  const handleRemoveCategory = (categoryId: string) => {
    onFilterChange({
      ...activeFilters,
      selectedCategories: activeFilters.selectedCategories.filter(
        (id) => id !== categoryId
      ),
    });
  };

  const handleRemoveLabel = (labelId: string) => {
    onFilterChange({
      ...activeFilters,
      selectedLabels: activeFilters.selectedLabels.filter(
        (id) => id !== labelId
      ),
    });
  };

  const handleClearAllFilters = () => {
    onFilterChange({
      selectedCategories: [],
      selectedLabels: [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex flex-col h-full">
        <div className="flex justify-end px-[40px] pt-[40px] pb-0">
          <button
            onClick={onClose}
            className="w-[45px] h-[45px] flex items-center justify-center"
          >
            <Image
              src="/icons/close-filter.svg"
              alt="Close"
              width={20}
              height={20}
            />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[40px] py-[10px]">
          <OverlayHeader activeFiltersCount={activeFiltersCount} />

          <div className="flex flex-col gap-[30px] py-[20px] pb-[140px]">
            <ActiveFilterSummary
              activeFilters={activeFilters}
              categories={categories}
              labels={FILTER_LABEL_OPTIONS}
              onRemoveCategory={handleRemoveCategory}
              onRemoveLabel={handleRemoveLabel}
              onClearAll={handleClearAllFilters}
              clearButtonLabel="Effacer tous les filtres"
            />

            <OverlayCategorySection
              categories={categories}
              selectedCategories={activeFilters.selectedCategories}
              isOpen={isCategoriesOpen}
              onToggleOpen={() => setIsCategoriesOpen((prev) => !prev)}
              onToggleCategory={handleCategoryToggle}
            />

            <OverlayLabelSection
              labels={FILTER_LABEL_OPTIONS}
              selectedLabels={activeFilters.selectedLabels}
              isOpen={isLabelsOpen}
              onToggleOpen={() => setIsLabelsOpen((prev) => !prev)}
              onToggleLabel={handleLabelToggle}
              onClearLabels={() =>
                onFilterChange({
                  ...activeFilters,
                  selectedLabels: [],
                })
              }
            />
          </div>
        </div>

        <div className="bg-white border-t border-border shadow-filter-overlay p-[20px]">
          <button
            onClick={onClose}
            className="w-full bg-primary h-[44px] rounded-[60px] flex items-center justify-center gap-[5px] px-[25px]"
          >
            <span
              className="font-poppins font-medium text-[16px] text-primary-foreground leading-normal"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Appliquer
            </span>
            <span
              className="font-poppins font-medium text-[16px] text-primary-foreground leading-normal"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              ({activeFiltersCount})
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface OverlayHeaderProps {
  activeFiltersCount: number;
}

function OverlayHeader({ activeFiltersCount }: OverlayHeaderProps) {
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex gap-[10px] h-[38px] items-center justify-center">
        <div className="flex-1 flex gap-[5px] items-end">
          <h2
            className="font-poppins font-medium text-[25px] text-primary leading-normal"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Filtres
          </h2>
          <span
            className="font-plus-jakarta-sans font-normal text-[14px] text-neutral-400 leading-normal"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            ({activeFiltersCount})
          </span>
        </div>
      </div>

      <div className="h-[1px] bg-border" />
    </div>
  );
}

interface ActiveFilterSummaryProps {
  activeFilters: FilterState;
  categories: Category[];
  labels: FilterLabelOption[];
  onRemoveCategory: (categoryId: string) => void;
  onRemoveLabel: (labelId: string) => void;
  onClearAll: () => void;
  clearButtonLabel: string;
}

function ActiveFilterSummary({
  activeFilters,
  categories,
  labels,
  onRemoveCategory,
  onRemoveLabel,
  onClearAll,
  clearButtonLabel,
}: ActiveFilterSummaryProps) {
  const hasActiveFilters =
    activeFilters.selectedCategories.length > 0 ||
    activeFilters.selectedLabels.length > 0 ||
    activeFilters.priceRange;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="bg-white flex flex-wrap gap-[10px] py-[10px]">
        {activeFilters.priceRange && (
          <div className="bg-white flex items-center gap-[5px]">
            <div className="w-[14px] h-[14px] overflow-hidden flex items-center justify-center">
              <Image
                src="/icons/close-filter.svg"
                alt=""
                width={10}
                height={10}
              />
            </div>
            <span
              className="font-plus-jakarta-sans font-normal text-[16px] text-neutral-400 leading-normal whitespace-nowrap"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {activeFilters.priceRange.min}€ - {activeFilters.priceRange.max}€
            </span>
          </div>
        )}

        {activeFilters.selectedCategories.map((categoryId) => {
          const category = categories.find((c) => c.id === categoryId);
          if (!category) {
            return null;
          }

          return (
            <div
              key={categoryId}
              className="bg-white flex items-center gap-[5px]"
            >
              <button
                onClick={() => onRemoveCategory(categoryId)}
                className="w-[14px] h-[14px] overflow-hidden flex items-center justify-center"
                aria-label={`Retirer le filtre ${category.name}`}
              >
                <Image
                  src="/icons/close-filter.svg"
                  alt=""
                  width={10}
                  height={10}
                />
              </button>
              <span
                className="font-plus-jakarta-sans font-normal text-[16px] text-neutral-400 leading-normal whitespace-nowrap"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {category.name}
              </span>
            </div>
          );
        })}

        {activeFilters.selectedLabels.map((labelId) => {
          const label = labels.find((l) => l.id === labelId);
          if (!label) {
            return null;
          }

          return (
            <div key={labelId} className="bg-white flex items-center gap-[5px]">
              <button
                onClick={() => onRemoveLabel(labelId)}
                className="w-[14px] h-[14px] overflow-hidden flex items-center justify-center"
                aria-label={`Retirer le filtre ${label.name}`}
              >
                <Image
                  src="/icons/close-filter.svg"
                  alt=""
                  width={10}
                  height={10}
                />
              </button>
              <span
                className="font-plus-jakarta-sans font-normal text-[16px] text-neutral-400 leading-normal whitespace-nowrap"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {label.name}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={onClearAll}
        className="bg-primary/10 h-[34px] rounded-[60px] flex items-center justify-center px-[20px] w-full"
      >
        <span
          className="font-outfit font-normal text-[16px] text-primary leading-normal whitespace-nowrap"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {clearButtonLabel}
        </span>
      </button>
    </div>
  );
}

interface OverlayCategorySectionProps {
  categories: Category[];
  selectedCategories: string[];
  isOpen: boolean;
  onToggleOpen: () => void;
  onToggleCategory: (categoryId: string) => void;
}

function OverlayCategorySection({
  categories,
  selectedCategories,
  isOpen,
  onToggleOpen,
  onToggleCategory,
}: OverlayCategorySectionProps) {
  return (
    <div className="bg-white flex flex-col gap-[20px]">
      <div className="border-b border-border flex items-center justify-between py-[5px] pr-[10px]">
        <h3
          className="flex-1 font-poppins font-semibold text-[20px] text-primary leading-normal"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Catégories
        </h3>
        <button onClick={onToggleOpen} className="w-[20px] h-[20px]">
          <Image
            src="/icons/chevron-collapse.svg"
            alt=""
            width={20}
            height={20}
            className={`transition-transform ${isOpen ? "" : "-rotate-90"}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="bg-white flex flex-col gap-[10px] p-[10px]">
          {categories.map((category) => {
            const isChecked = selectedCategories.includes(category.id);

            return (
              <div
                key={category.id}
                className="flex items-center justify-between group"
              >
                <button
                  onClick={() => onToggleCategory(category.id)}
                  className="flex items-center h-[24px] py-[5px] border-b border-transparent group-hover:border-neutral-600 transition-colors duration-200"
                >
                  <span
                    className={`font-plus-jakarta-sans font-normal text-[16px] leading-normal whitespace-nowrap transition-colors duration-200 ${
                      isChecked
                        ? "text-primary"
                        : "text-neutral-400 group-hover:text-neutral-600"
                    }`}
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {category.name}
                  </span>
                </button>
                <span
                  className="font-plus-jakarta-sans font-light text-[14px] text-neutral-400 leading-normal text-right w-[50px] overflow-hidden text-ellipsis whitespace-nowrap"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {category.count > 9999 ? "+9999" : category.count}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface OverlayLabelSectionProps {
  labels: FilterLabelOption[];
  selectedLabels: string[];
  isOpen: boolean;
  onToggleOpen: () => void;
  onToggleLabel: (labelId: string) => void;
  onClearLabels: () => void;
}

function OverlayLabelSection({
  labels,
  selectedLabels,
  isOpen,
  onToggleOpen,
  onToggleLabel,
  onClearLabels,
}: OverlayLabelSectionProps) {
  return (
    <div className="bg-white flex flex-col gap-[10px]">
      <div className="border-b border-border flex items-center justify-between py-[5px] pr-[10px]">
        <div className="flex-1 flex items-center gap-[10px]">
          <h3
            className="flex-1 font-poppins font-semibold text-[20px] text-primary leading-normal"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Labels de qualité
          </h3>
          {selectedLabels.length > 0 && (
            <div className="bg-neutral-500 rounded-[60px] w-[20px] h-[20px] flex items-center justify-center">
              <span
                className="font-outfit font-semibold text-[14px] text-white leading-normal whitespace-nowrap"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                +{selectedLabels.length}
              </span>
            </div>
          )}
        </div>
        <button onClick={onToggleOpen} className="w-[20px] h-[20px]">
          <Image
            src="/icons/chevron-collapse.svg"
            alt=""
            width={20}
            height={20}
            className={`transition-transform ${isOpen ? "" : "-rotate-90"}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="p-[10px] flex flex-col gap-[15px]">
          <div className="flex flex-col gap-[5px] pl-[5px]">
            {labels.map((label) => {
              const isChecked = selectedLabels.includes(label.id);

              return (
                <button
                  key={label.id}
                  onClick={() => onToggleLabel(label.id)}
                  className="bg-white flex items-center gap-[10px] h-[26px] py-[5px]"
                >
                  <div className="w-[16px] h-[16px]">
                    {isChecked ? (
                      <div className="bg-white border border-primary rounded-[3px] w-[16px] h-[16px] flex items-center justify-center p-[3px]">
                        <div className="bg-primary rounded-[2px] w-full h-full" />
                      </div>
                    ) : (
                      <div className="bg-white border border-neutral-400 rounded-[3px] w-[16px] h-[16px]" />
                    )}
                  </div>
                  <span
                    className={`flex-1 font-plus-jakarta-sans font-normal text-[16px] leading-normal text-left overflow-hidden text-ellipsis whitespace-nowrap ${
                      isChecked ? "text-primary" : "text-neutral-400"
                    }`}
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {label.name}
                  </span>
                  <span
                    className={`font-plus-jakarta-sans font-light text-[14px] leading-normal overflow-hidden text-ellipsis whitespace-nowrap ${
                      isChecked ? "text-primary" : "text-neutral-400"
                    }`}
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {label.count > 9999 ? "+9999" : label.count}
                  </span>
                </button>
              );
            })}
          </div>
          {selectedLabels.length > 0 && (
            <button
              onClick={onClearLabels}
              className="bg-primary/10 h-[34px] rounded-[60px] flex items-center justify-center px-[20px] w-full"
            >
              <span
                className="font-outfit font-normal text-[16px] text-primary leading-normal whitespace-nowrap"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Effacer le filtre
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
