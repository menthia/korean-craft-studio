"use client";

import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { TAB_ITEMS, panelElementId, tabElementId } from "@/lib/site";
import type { SiteTabId } from "@/types";

type TabNavProps = {
  activeTab: SiteTabId;
  onChange: (id: SiteTabId) => void;
};

export default function TabNav({ activeTab, onChange }: TabNavProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const moveTo = (index: number) => {
    const next = TAB_ITEMS[index];
    onChange(next.id);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = TAB_ITEMS.length - 1;
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        moveTo(index === last ? 0 : index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        moveTo(index === 0 ? last : index - 1);
        break;
      case "Home":
        event.preventDefault();
        moveTo(0);
        break;
      case "End":
        event.preventDefault();
        moveTo(last);
        break;
    }
  };

  return (
    <div role="tablist" aria-label="주요 메뉴" className="flex w-full sm:w-auto">
      {TAB_ITEMS.map((item, index) => {
        const selected = item.id === activeTab;
        return (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={tabElementId(item.id)}
            aria-selected={selected}
            aria-controls={panelElementId(item.id)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`min-h-11 flex-1 border-b-2 px-3 text-sm sm:flex-none sm:px-5 sm:text-base ${
              selected
                ? "border-accent font-bold text-ink"
                : "border-transparent font-normal text-ink-soft hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
