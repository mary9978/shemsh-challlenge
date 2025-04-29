"use client";
import { useEffect, useState, useCallback } from "react";
import GoldInstantPriceCard from "@/components/GoldInstantPriceCard";
import GoldTabSwitcher from "@/components/GoldTabSwitcher";
import GoldPriceForm from "@/components/GoldPriceForm";
import HeaderTitle from "@/components/HeaderTitle";
export default function Home() {
  const [price, setPrice] = useState<string>("");
  const [activeTab, setActiveTab] = useState<number>(1);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  // Toggle active tab
  const toggleTab = useCallback((tabId: number) => setActiveTab(tabId), []);
  // Handle button disable logic
  const handleDisableBtn = useCallback((priceprop: string, sot: string) => {
    if (Number(priceprop) !== 0 && Number(sot) !== 0) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, []);
  // Fetch gold price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("https://testapi.shemsh.gold/api/app/gold/price");
        const data = await res.json();
        if (data?.price !== price) {
          setPrice(data?.price);
        }
      } catch (error) {
        setPrice("0");
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, [price]);
  return (
    <div className="container-fluid flex justify-center h-screen">
      <div className="flex flex-col w-[360px] md:w-[600px] pt-6 border justify-between shadow-xl">
        <div>
          <HeaderTitle />
          <GoldInstantPriceCard price={price} />
          <GoldTabSwitcher activeTab={activeTab} toggleTab={toggleTab} />
          {activeTab === 1 && <GoldPriceForm priceprop={price} disabledBtnFn={handleDisableBtn} />}
        </div>
        <button
          className={`button--style ${
            disabledBtn ? "disabled" : ""
          }`}
        >
          {activeTab === 1 ? "خرید طلا" : "فروش طلا"}
        </button>
      </div>
    </div>
  );
}
