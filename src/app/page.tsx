"use client";

import { useState } from "react";
import ClassesSection from "@/components/classes/ClassesSection";
import CraftsSection from "@/components/crafts/CraftsSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PracticeNotice from "@/components/PracticeNotice";
import { panelElementId, tabElementId } from "@/lib/site";
import type { SiteTabId } from "@/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<SiteTabId>("crafts");

  return (
    <>
      <PracticeNotice />
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        <Hero />
        <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
          {/* 두 패널을 모두 마운트하고 비활성 패널만 hidden 처리한다 (aria-controls 대상 유지, 모달·입력 상태 보존) */}
          <div
            role="tabpanel"
            id={panelElementId("crafts")}
            aria-labelledby={tabElementId("crafts")}
            hidden={activeTab !== "crafts"}
            tabIndex={0}
          >
            <CraftsSection />
          </div>
          <div
            role="tabpanel"
            id={panelElementId("classes")}
            aria-labelledby={tabElementId("classes")}
            hidden={activeTab !== "classes"}
            tabIndex={0}
          >
            <ClassesSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
