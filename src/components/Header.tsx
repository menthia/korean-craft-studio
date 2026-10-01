"use client";

import { SITE_NAME } from "@/lib/site";
import type { SiteTabId } from "@/types";
import TabNav from "./TabNav";

type HeaderProps = {
  activeTab: SiteTabId;
  onTabChange: (id: SiteTabId) => void;
};

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 pt-3 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:pt-4">
        <p className="font-serif text-xl font-bold text-ink">{SITE_NAME}</p>
        <TabNav activeTab={activeTab} onChange={onTabChange} />
      </div>
    </header>
  );
}
