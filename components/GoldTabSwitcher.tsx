"use client";

import { TabSwitcherProps } from "@/types/price.interface";

const GoldTabSwitcher: React.FC<TabSwitcherProps> = ({ activeTab, toggleTab }) => {
  const tabs = [
    { id: 1, label: "خرید طلا" },
    { id: 2, label: "فروش طلا" },
  ];

  return (
    <div className="tab-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => toggleTab(tab.id)}
          className={`tab--style ${activeTab === tab.id ? "active--tab" : "inactive--tab"}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default GoldTabSwitcher;