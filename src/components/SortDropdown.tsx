"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { SortOption, SortValue } from "@/types/product";

interface SortDropdownProps {
  options: SortOption[];
  currentSort: SortValue;
  onSortChange: (sortValue: SortValue) => void;
}

export function SortDropdown({
  options,
  currentSort,
  onSortChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption =
    options.find((opt) => opt.value === currentSort) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer gap-2"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col justify-center leading-[0]">
          <span
            className={`font-poppins font-medium text-[16px] text-neutral-600 whitespace-nowrap ${
              isOpen ? "" : "pt-[6px]"
            }`}
          >
            Trier par
          </span>
        </div>
        <div className="flex flex-col gap-[5px] items-start pt-[6px] pb-0 px-0 w-[113.5px]">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col justify-center leading-[0]">
              <span
                className="font-poppins font-medium text-[16px] text-neutral-500 whitespace-nowrap"
              >
                {currentOption.label}
              </span>
            </div>
            <div className="w-[22.5px] h-[22.5px]">
              <Image
                src="/icons/chevron-down.svg"
                alt=""
                width={22.5}
                height={22.5}
                className="w-full h-full"
              />
            </div>
          </div>
          {isOpen && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0 }}
              transition={{ duration: 0.2 }}
              className="h-[1px] bg-neutral-500"
            />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-[240px] bg-white rounded-[10px] shadow-dropdown overflow-hidden z-20"
          >
            <ul role="listbox">
              {options.map((option, index) => (
                <SortDropdownOption
                  key={option.id}
                  option={option}
                  isSelected={option.value === currentSort}
                  animationDelay={index * 0.05}
                  onSelect={(value) => {
                    onSortChange(value);
                    setIsOpen(false);
                  }}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SortDropdownOptionProps {
  option: SortOption;
  isSelected: boolean;
  animationDelay: number;
  onSelect: (value: SortValue) => void;
}

function SortDropdownOption({
  option,
  isSelected,
  animationDelay,
  onSelect,
}: SortDropdownOptionProps) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: animationDelay }}
    >
      <button
        onClick={() => onSelect(option.value)}
        className={`w-full px-7 py-3 text-left transition-colors ${
          isSelected
            ? "bg-primary text-primary-foreground"
            : "bg-white text-neutral-500 hover:bg-neutral-150"
        }`}
        role="option"
        aria-selected={isSelected}
      >
        <div className="flex">
          <span className="font-poppins font-medium text-[16px]">
            {option.label}
          </span>
        </div>
      </button>
    </motion.li>
  );
}
