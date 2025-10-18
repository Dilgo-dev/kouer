"use client";

import { useState } from "react";
import Image from "next/image";
import type { Category, FilterState } from "@/types/product";

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onFilterChange: (filters: FilterState) => void;
  activeFilters: FilterState;
}

const LABELS = [
  { id: "bio", name: "BIO", count: 9999 },
  { id: "bleu-blanc-coeur", name: "Bleu Blanc Coeur", count: 8 },
  { id: "peche-durable-msc", name: "Pêche durable MSC", count: 0 },
  { id: "elu-produit-annee", name: "Élu produit de l'année", count: 2 },
  { id: "produit-montagne", name: "Produit de montagne", count: 14 },
  { id: "label-rouge", name: "Label Rouge", count: 9999 },
  { id: "aoc", name: "Appellation d'origine contrôlée", count: 9999 },
  { id: "demeter", name: "Demeter", count: 0 },
  { id: "fairtrade", name: "Fairtrade", count: 0 },
  { id: "medaille-or", name: "Médaille d'or Paris", count: 2 },
  { id: "medaille-argent", name: "Médaille d'argent Paris", count: 2 },
  { id: "medaille-bronze", name: "Médaille de Bronze Paris", count: 3 },
  { id: "produit-certifie", name: "Produit certifié", count: 9999 },
  { id: "stg", name: "Spécialité traditionnelle garantie", count: 9999 },
  { id: "aop", name: "Appellation d'origine protégée", count: 9999 },
  { id: "igp", name: "Indication géographique protégée", count: 9999 },
  { id: "vbf", name: "Viande bovine française", count: 9999 },
  { id: "peche-durable", name: "Pêche Durable", count: 9999 },
  { id: "vegan", name: "Vegan", count: 68 },
  {
    id: "excellence-savoir-faire",
    name: "L'excellence des savoir-faire français",
    count: 5,
  },
  { id: "prix-excellence", name: "Prix d'excellence", count: 34 },
  { id: "college-culinaire", name: "Collège culinaire de France", count: 9999 },
  { id: "prix-epicures", name: "Prix Épicures", count: 1 },
  { id: "sans-gluten", name: "Sans gluten", count: 16 },
  { id: "produit-idf", name: "Produit en Ile de France", count: 3 },
];

export function FilterOverlay({
  isOpen,
  onClose,
  categories,
  onFilterChange,
  activeFilters,
}: FilterOverlayProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isLabelsOpen, setIsLabelsOpen] = useState(true);

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

  const handleRemoveFilter = (type: "category" | "label", id: string) => {
    if (type === "category") {
      onFilterChange({
        ...activeFilters,
        selectedCategories: activeFilters.selectedCategories.filter(
          (catId) => catId !== id
        ),
      });
    } else {
      onFilterChange({
        ...activeFilters,
        selectedLabels: activeFilters.selectedLabels.filter(
          (labelId) => labelId !== id
        ),
      });
    }
  };

  const handleClearAllFilters = () => {
    onFilterChange({
      selectedCategories: [],
      selectedLabels: [],
    });
  };

  const hasActiveFilters =
    activeFilters.selectedCategories.length > 0 ||
    activeFilters.selectedLabels.length > 0 ||
    activeFilters.priceRange;

  if (!isOpen) return null;

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
          <div className="flex flex-col gap-[15px]">
            <div className="flex gap-[10px] h-[38px] items-center justify-center">
              <div className="flex-1 flex gap-[5px] items-end">
                <h2
                  className="font-poppins font-medium text-[25px] text-[#4ea04c] leading-normal"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Filters
                </h2>
                <span
                  className="font-plus-jakarta-sans font-normal text-[14px] text-[#aaaaaa] leading-normal"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  ({activeFiltersCount})
                </span>
              </div>
            </div>

            <div className="h-[1px] bg-[#e3e3e3]" />
          </div>

          <div className="flex flex-col gap-[30px] py-[20px] pb-[140px]">
            {hasActiveFilters && (
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
                        className="font-plus-jakarta-sans font-normal text-[16px] text-[#aaaaaa] leading-normal whitespace-nowrap"
                        style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                      >
                        {activeFilters.priceRange.min}€ -{" "}
                        {activeFilters.priceRange.max}€
                      </span>
                    </div>
                  )}
                  {activeFilters.selectedCategories.map((categoryId) => {
                    const category = categories.find((c) => c.id === categoryId);
                    return category ? (
                      <div
                        key={categoryId}
                        className="bg-white flex items-center gap-[5px]"
                      >
                        <button
                          onClick={() => handleRemoveFilter("category", categoryId)}
                          className="w-[14px] h-[14px] overflow-hidden flex items-center justify-center"
                        >
                          <Image
                            src="/icons/close-filter.svg"
                            alt=""
                            width={10}
                            height={10}
                          />
                        </button>
                        <span
                          className="font-plus-jakarta-sans font-normal text-[16px] text-[#aaaaaa] leading-normal whitespace-nowrap"
                          style={{
                            fontFamily: "var(--font-plus-jakarta-sans)",
                          }}
                        >
                          {category.name}
                        </span>
                      </div>
                    ) : null;
                  })}
                  {activeFilters.selectedLabels.map((labelId) => {
                    const label = LABELS.find((l) => l.id === labelId);
                    return label ? (
                      <div
                        key={labelId}
                        className="bg-white flex items-center gap-[5px]"
                      >
                        <button
                          onClick={() => handleRemoveFilter("label", labelId)}
                          className="w-[14px] h-[14px] overflow-hidden flex items-center justify-center"
                        >
                          <Image
                            src="/icons/close-filter.svg"
                            alt=""
                            width={10}
                            height={10}
                          />
                        </button>
                        <span
                          className="font-plus-jakarta-sans font-normal text-[16px] text-[#aaaaaa] leading-normal whitespace-nowrap"
                          style={{
                            fontFamily: "var(--font-plus-jakarta-sans)",
                          }}
                        >
                          {label.name}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>
                <button
                  onClick={handleClearAllFilters}
                  className="bg-[rgba(78,160,76,0.1)] h-[34px] rounded-[60px] flex items-center justify-center px-[20px] w-full"
                >
                  <span
                    className="font-outfit font-normal text-[16px] text-[#4ea04c] leading-normal whitespace-nowrap"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    Clear all filters
                  </span>
                </button>
              </div>
            )}

            <div className="bg-white flex flex-col gap-[20px]">
              <div className="border-b border-[#e3e3e3] flex items-center justify-between py-[5px] pr-[10px]">
                <h3
                  className="flex-1 font-poppins font-semibold text-[20px] text-[#4ea04c] leading-normal"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Categories
                </h3>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-[20px] h-[20px]"
                >
                  <Image
                    src="/icons/chevron-collapse.svg"
                    alt=""
                    width={20}
                    height={20}
                    className={`transition-transform ${
                      isCategoriesOpen ? "" : "-rotate-90"
                    }`}
                  />
                </button>
              </div>

              {isCategoriesOpen && (
                <div className="bg-white flex flex-col gap-[10px] p-[10px]">
                  {categories.map((category) => {
                    const isChecked = activeFilters.selectedCategories.includes(
                      category.id
                    );
                    return (
                      <div
                        key={category.id}
                        className="flex items-center justify-between group"
                      >
                        <button
                          onClick={() => handleCategoryToggle(category.id)}
                          className="flex items-center h-[24px] py-[5px] border-b border-transparent group-hover:border-[#505050] transition-colors duration-200"
                        >
                          <span
                            className={`font-plus-jakarta-sans font-normal text-[16px] leading-normal whitespace-nowrap transition-colors duration-200 ${
                              isChecked ? "text-[#4ea04c]" : "text-[#aaaaaa] group-hover:text-[#505050]"
                            }`}
                            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                          >
                            {category.name}
                          </span>
                        </button>
                        <span
                          className="font-plus-jakarta-sans font-light text-[14px] text-[#aaaaaa] leading-normal text-right w-[50px] overflow-hidden text-ellipsis whitespace-nowrap"
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

            <div className="bg-white flex flex-col gap-[10px]">
              <div className="border-b border-[#e3e3e3] flex items-center justify-between py-[5px] pr-[10px]">
                <div className="flex-1 flex items-center gap-[10px]">
                  <h3
                    className="flex-1 font-poppins font-semibold text-[20px] text-[#4ea04c] leading-normal"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Labels
                  </h3>
                  {activeFilters.selectedLabels.length > 0 && (
                    <div className="bg-[#858585] rounded-[60px] w-[20px] h-[20px] flex items-center justify-center">
                      <span
                        className="font-outfit font-semibold text-[14px] text-white leading-normal whitespace-nowrap"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        +{activeFilters.selectedLabels.length}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsLabelsOpen(!isLabelsOpen)}
                  className="w-[20px] h-[20px]"
                >
                  <Image
                    src="/icons/chevron-collapse.svg"
                    alt=""
                    width={20}
                    height={20}
                    className={`transition-transform ${
                      isLabelsOpen ? "" : "-rotate-90"
                    }`}
                  />
                </button>
              </div>

              {isLabelsOpen && (
                <div className="p-[10px] flex flex-col gap-[15px]">
                  <div className="flex flex-col gap-[5px] pl-[5px]">
                    {LABELS.map((label) => {
                      const isChecked = activeFilters.selectedLabels.includes(
                        label.id
                      );
                      return (
                        <button
                          key={label.id}
                          onClick={() => handleLabelToggle(label.id)}
                          className="bg-white flex items-center gap-[10px] h-[26px] py-[5px]"
                        >
                          <div className="w-[16px] h-[16px]">
                            {isChecked ? (
                              <div className="bg-white border border-[#4ea04c] rounded-[3px] w-[16px] h-[16px] flex items-center justify-center p-[3px]">
                                <div className="bg-[#4ea04c] rounded-[2px] w-full h-full" />
                              </div>
                            ) : (
                              <div className="bg-white border border-[#aaaaaa] rounded-[3px] w-[16px] h-[16px]" />
                            )}
                          </div>
                          <span
                            className={`flex-1 font-plus-jakarta-sans font-normal text-[16px] leading-normal text-left overflow-hidden text-ellipsis whitespace-nowrap ${
                              isChecked ? "text-[#4ea04c]" : "text-[#aaaaaa]"
                            }`}
                            style={{
                              fontFamily: "var(--font-plus-jakarta-sans)",
                            }}
                          >
                            {label.name}
                          </span>
                          <span
                            className={`font-plus-jakarta-sans font-light text-[14px] leading-normal overflow-hidden text-ellipsis whitespace-nowrap ${
                              isChecked ? "text-[#4ea04c]" : "text-[#aaaaaa]"
                            }`}
                            style={{
                              fontFamily: "var(--font-plus-jakarta-sans)",
                            }}
                          >
                            {label.count > 9999 ? "+9999" : label.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {activeFilters.selectedLabels.length > 0 && (
                    <button
                      onClick={() =>
                        onFilterChange({
                          ...activeFilters,
                          selectedLabels: [],
                        })
                      }
                      className="bg-[rgba(78,160,76,0.1)] h-[34px] rounded-[60px] flex items-center justify-center px-[20px] w-full"
                    >
                      <span
                        className="font-outfit font-normal text-[16px] text-[#4ea04c] leading-normal whitespace-nowrap"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        Clear filter
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-[#e3e3e3] shadow-[0px_-4px_30px_0px_rgba(87,117,92,0.25)] p-[20px]">
          <button
            onClick={onClose}
            className="w-full bg-[#4ea04c] h-[44px] rounded-[60px] flex items-center justify-center gap-[5px] px-[25px]"
          >
            <span
              className="font-poppins font-medium text-[16px] text-white leading-normal"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Apply
            </span>
            <span
              className="font-poppins font-medium text-[16px] text-white leading-normal"
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
