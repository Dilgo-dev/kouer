"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { SortOption } from "@/types/product";

interface SortDropdownProps {
  options: SortOption[];
  currentSort: string;
  onSortChange: (sortValue: string) => void;
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
            className="font-poppins font-medium text-[16px] text-[#505050] whitespace-nowrap pt-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Trier par
          </span>
        </div>
        <div className="flex flex-col gap-[5px] items-start pt-[6px] pb-0 px-0 w-[113.5px]">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col justify-center leading-[0]">
              <span
                className="font-poppins font-medium text-[16px] text-[#858585] whitespace-nowrap"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {currentOption.label}
              </span>
            </div>
            <div
              className={`w-[22.5px] h-[22.5px] transition-transform ${
                isOpen ? "rotate-180" : "rotate-90"
              }`}
            >
              <Image
                src="/icons/chevron-down.svg"
                alt=""
                width={22.5}
                height={22.5}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[240px] bg-white rounded-[10px] shadow-[2px_4px_40px_0px_rgba(0,0,0,0.25)] overflow-hidden z-20">
          <ul role="listbox">
            {options.map((option) => (
              <li key={option.id}>
                <button
                  onClick={() => {
                    onSortChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-[30px] py-[12px] text-left font-poppins font-medium text-[16px] leading-[0] transition-colors ${
                    option.value === currentSort
                      ? "bg-[#4ea04c] text-white"
                      : "bg-white text-[#858585] hover:bg-gray-50"
                  }`}
                  style={{ fontFamily: "var(--font-poppins)" }}
                  role="option"
                  aria-selected={option.value === currentSort}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
