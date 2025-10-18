"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Category, FilterState, FilterLabelOption } from "@/types/product";

interface FilterSidebarProps {
  categories: Category[];
  labels: FilterLabelOption[];
  onFilterChange: (filters: FilterState) => void;
  activeFilters: FilterState;
}

const MAX_LABEL_NAME_LENGTH = 24;

function truncateLabelName(label: string) {
  if (label.length <= MAX_LABEL_NAME_LENGTH) {
    return label;
  }
  return `${label.slice(0, MAX_LABEL_NAME_LENGTH - 3)}...`;
}

export function FilterSidebar({
  categories,
  labels,
  onFilterChange,
  activeFilters,
}: FilterSidebarProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isLabelsOpen, setIsLabelsOpen] = useState(true);

  const activeLabelsCount = activeFilters.selectedLabels.length;

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
    <aside className="hidden lg:block pl-[20px] pr-0 py-[40px] max-w-[20rem]">
      <div className="bg-white rounded-[3px] overflow-y-auto flex flex-col gap-[30px] sidebar-scroll">
        <div className="bg-white flex flex-col gap-[15px]">
          <div className="border-b border-border flex items-center justify-center py-[5px]">
            <h2 className="flex-1 font-poppins font-semibold text-[20px] text-primary leading-normal">
              Filtres
            </h2>
          </div>

          <ActiveFilterPanel
            activeFilters={activeFilters}
            categories={categories}
            labels={labels}
            onRemoveCategory={handleRemoveCategory}
            onRemoveLabel={handleRemoveLabel}
            onClearAll={handleClearAllFilters}
            clearButtonLabel="Effacer tous les filtres"
          />
        </div>

        <CategorySection
          categories={categories}
          selectedCategories={activeFilters.selectedCategories}
          isOpen={isCategoriesOpen}
          onToggleOpen={() => setIsCategoriesOpen((prev) => !prev)}
          onToggleCategory={handleCategoryToggle}
        />

        <LabelSection
          labels={labels}
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
          activeLabelsCount={activeLabelsCount}
          clearButtonLabel="Effacer le filtre"
        />
      </div>
    </aside>
  );
}

interface ActiveFilterPanelProps {
  activeFilters: FilterState;
  categories: Category[];
  labels: FilterLabelOption[];
  onRemoveCategory: (categoryId: string) => void;
  onRemoveLabel: (labelId: string) => void;
  onClearAll: () => void;
  clearButtonLabel: string;
}

function ActiveFilterPanel({
  activeFilters,
  categories,
  labels,
  onRemoveCategory,
  onRemoveLabel,
  onClearAll,
  clearButtonLabel,
}: ActiveFilterPanelProps) {
  const hasActiveFilters =
    activeFilters.selectedCategories.length > 0 ||
    activeFilters.selectedLabels.length > 0 ||
    activeFilters.priceRange;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <section className="flex flex-col gap-[10px]" aria-label="Filtres actifs">
      <ul className="bg-white flex flex-wrap gap-[10px] py-[10px]" role="list">
        {activeFilters.priceRange && (
          <li className="bg-white flex items-center gap-[5px]">
            <div className="w-[14px] h-[14px] overflow-hidden flex items-center justify-center">
              <Image
                src="/icons/close-filter.svg"
                alt=""
                width={10}
                height={10}
                aria-hidden="true"
              />
            </div>
            <span className="font-plus-jakarta-sans font-normal text-[16px] text-neutral-400 leading-normal whitespace-nowrap">
              {activeFilters.priceRange.min}€ - {activeFilters.priceRange.max}€
            </span>
          </li>
        )}
        {activeFilters.selectedCategories.map((categoryId) => {
          const category = categories.find((c) => c.id === categoryId);
          if (!category) {
            return null;
          }

          return (
            <ActiveFilterCategoryItem
              key={categoryId}
              category={category}
              onRemove={() => onRemoveCategory(categoryId)}
            />
          );
        })}
        {activeFilters.selectedLabels.map((labelId) => {
          const label = labels.find((l) => l.id === labelId);
          if (!label) {
            return null;
          }

          return (
            <ActiveFilterLabelItem
              key={labelId}
              label={label}
              onRemove={() => onRemoveLabel(labelId)}
            />
          );
        })}
      </ul>
      <button
        type="button"
        onClick={onClearAll}
        className="bg-primary/10 h-[34px] rounded-[60px] flex items-center justify-center px-[20px] w-full"
      >
        <span className="font-outfit font-normal text-[16px] text-primary leading-normal whitespace-nowrap">
          {clearButtonLabel}
        </span>
      </button>
    </section>
  );
}

interface ActiveFilterCategoryItemProps {
  category: Category;
  onRemove: () => void;
}

function ActiveFilterCategoryItem({
  category,
  onRemove,
}: ActiveFilterCategoryItemProps) {
  return (
    <li className="bg-white flex items-center gap-[5px]">
      <button
        type="button"
        onClick={onRemove}
        className="w-[14px] h-[14px] overflow-hidden flex items-center justify-center"
        aria-label={`Retirer le filtre ${category.name}`}
      >
        <Image
          src="/icons/close-filter.svg"
          alt=""
          width={10}
          height={10}
          aria-hidden="true"
        />
      </button>
      <span className="font-plus-jakarta-sans font-normal text-[16px] text-neutral-400 leading-normal whitespace-nowrap">
        {category.name}
      </span>
    </li>
  );
}

interface ActiveFilterLabelItemProps {
  label: FilterLabelOption;
  onRemove: () => void;
}

function ActiveFilterLabelItem({
  label,
  onRemove,
}: ActiveFilterLabelItemProps) {
  return (
    <li className="bg-white flex items-center gap-[5px]">
      <button
        type="button"
        onClick={onRemove}
        className="w-[14px] h-[14px] overflow-hidden flex items-center justify-center"
        aria-label={`Retirer le filtre ${label.name}`}
      >
        <Image
          src="/icons/close-filter.svg"
          alt=""
          width={10}
          height={10}
          aria-hidden="true"
        />
      </button>
      <span className="font-plus-jakarta-sans font-normal text-[16px] text-neutral-400 leading-normal whitespace-nowrap">
        {label.name}
      </span>
    </li>
  );
}

interface CategorySectionProps {
  categories: Category[];
  selectedCategories: string[];
  isOpen: boolean;
  onToggleOpen: () => void;
  onToggleCategory: (categoryId: string) => void;
}

function CategorySection({
  categories,
  selectedCategories,
  isOpen,
  onToggleOpen,
  onToggleCategory,
}: CategorySectionProps) {
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null
  );
  const headingId = useId();

  return (
    <section
      className="bg-white flex flex-col gap-[20px]"
      aria-labelledby={headingId}
    >
      <div className="border-b border-border flex items-center justify-between py-[5px] pr-[10px]">
        <h3
          id={headingId}
          className="flex-1 font-poppins font-semibold text-[20px] text-primary leading-normal"
        >
          Catégories
        </h3>
        <button
          type="button"
          onClick={onToggleOpen}
          className="w-[20px] h-[20px]"
          aria-expanded={isOpen}
          aria-controls={`${headingId}-list`}
        >
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
        <ul
          id={`${headingId}-list`}
          className="bg-white flex flex-col gap-[10px] p-[10px]"
          role="list"
        >
          {categories.map((category) => {
            const isChecked = selectedCategories.includes(category.id);
            const isHovered = hoveredCategoryId === category.id;

            return (
              <CategoryListItem
                key={category.id}
                category={category}
                isChecked={isChecked}
                isHovered={isHovered}
                onToggle={() => onToggleCategory(category.id)}
                onMouseEnter={() => setHoveredCategoryId(category.id)}
                onMouseLeave={() => setHoveredCategoryId(null)}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
}

interface CategoryListItemProps {
  category: Category;
  isChecked: boolean;
  isHovered: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function CategoryListItem({
  category,
  isChecked,
  isHovered,
  onToggle,
  onMouseEnter,
  onMouseLeave,
}: CategoryListItemProps) {
  return (
    <li className="flex items-center justify-between group">
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="flex items-center h-[24px] py-[5px] border-b border-transparent group-hover:border-neutral-600 transition-colors duration-200"
      >
        <span
          className={`font-plus-jakarta-sans font-normal text-[16px] leading-normal whitespace-nowrap transition-colors duration-200 ${
            isChecked
              ? "text-primary"
              : "text-neutral-400 group-hover:text-neutral-600"
          }`}
        >
          {category.name}
        </span>
        <motion.div
          className="ml-3"
          initial={{ opacity: 0, x: -5 }}
          animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Image
            src="/icons/chevron-left.svg"
            alt=""
            width={8}
            height={8}
            className="rotate-180"
          />
        </motion.div>
      </button>
      <span className="font-plus-jakarta-sans font-light text-[14px] text-neutral-400 leading-normal text-right w-[50px] overflow-hidden text-ellipsis whitespace-nowrap">
        {category.count > 9999 ? "+9999" : category.count}
      </span>
    </li>
  );
}

interface LabelSectionProps {
  labels: FilterLabelOption[];
  selectedLabels: string[];
  isOpen: boolean;
  onToggleOpen: () => void;
  onToggleLabel: (labelId: string) => void;
  onClearLabels: () => void;
  activeLabelsCount: number;
  clearButtonLabel: string;
}

function LabelSection({
  labels,
  selectedLabels,
  isOpen,
  onToggleOpen,
  onToggleLabel,
  onClearLabels,
  activeLabelsCount,
  clearButtonLabel,
}: LabelSectionProps) {
  const headingId = useId();
  return (
    <section
      className="bg-white flex flex-col gap-[10px]"
      aria-labelledby={headingId}
    >
      <div className="border-b border-border flex items-center justify-between py-[5px] pr-[10px]">
        <div className="flex-1 flex items-center gap-[10px]">
          <h3
            id={headingId}
            className="flex-1 font-poppins font-semibold text-[20px] text-primary leading-normal"
          >
            Labels
          </h3>
          {activeLabelsCount > 0 && (
            <div className="bg-neutral-500 rounded-[60px] w-[20px] h-[20px] flex items-center justify-center">
              <span className="font-outfit font-semibold text-[14px] text-white leading-normal whitespace-nowrap">
                +{activeLabelsCount}
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onToggleOpen}
          className="w-[20px] h-[20px]"
          aria-expanded={isOpen}
          aria-controls={`${headingId}-list`}
        >
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
          <ul
            id={`${headingId}-list`}
            className="flex flex-col gap-[5px] pl-[5px]"
            role="list"
          >
            {labels.map((label) => {
              const isChecked = selectedLabels.includes(label.id);

              return (
                <LabelListItem
                  key={label.id}
                  label={label}
                  isChecked={isChecked}
                  onToggle={() => onToggleLabel(label.id)}
                />
              );
            })}
          </ul>
          {selectedLabels.length > 0 && (
            <button
              type="button"
              onClick={onClearLabels}
              className="bg-primary/10 h-[34px] rounded-[60px] flex items-center justify-center px-[20px] w-full"
            >
              <span className="font-outfit font-normal text-[16px] text-primary leading-normal whitespace-nowrap">
                {clearButtonLabel}
              </span>
            </button>
          )}
        </div>
      )}
    </section>
  );
}

interface LabelListItemProps {
  label: FilterLabelOption;
  isChecked: boolean;
  onToggle: () => void;
}

function LabelListItem({ label, isChecked, onToggle }: LabelListItemProps) {
  const displayName = truncateLabelName(label.name);

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
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
          className={`min-w-0 flex-1 font-plus-jakarta-sans font-normal text-[16px] leading-normal text-left overflow-hidden text-ellipsis whitespace-nowrap ${
            isChecked ? "text-primary" : "text-neutral-400"
          }`}
          title={label.name}
        >
          {displayName}
        </span>
        <span
          className={`font-plus-jakarta-sans font-light text-[14px] leading-normal overflow-hidden text-ellipsis whitespace-nowrap ${
            isChecked ? "text-primary" : "text-neutral-400"
          }`}
        >
          {label.count > 9999 ? "+9999" : label.count}
        </span>
      </button>
    </li>
  );
}
