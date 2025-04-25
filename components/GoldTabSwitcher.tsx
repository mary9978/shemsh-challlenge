"use client";
interface TabSwitcherProps {
  activeTab: number;
  toggleTab: (tabIndex: 1|2) => void;
}
function GoldTabSwitcher({ activeTab, toggleTab }:TabSwitcherProps) {
  return (
    <div className="flex gap-2 mt-8 mb-2 w-[320px] mx-auto lg:w-[550px]">
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
