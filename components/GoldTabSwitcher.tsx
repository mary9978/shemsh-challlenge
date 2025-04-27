"use client";

import { TabSwitcherProps } from "@/types/price.interface";

function GoldTabSwitcher({ activeTab, toggleTab }:TabSwitcherProps) {
  return (
    <div className="flex gap-2 mt-8 mb-2 w-[320px] bg-bgLight rounded mx-auto md:w-[550px]">
      <button onClick={() => toggleTab(1)} className={`tab--style ${activeTab === 1 ? "active--tab" : "inactive--tab"}`}>
        خرید طلا
      </button>
      <button onClick={() => toggleTab(2)} className={`tab--style ${activeTab === 2 ? "active--tab" : "inactive--tab"}`}>
        فروش طلا
      </button>
    </div>
  );
}

export default GoldTabSwitcher;
