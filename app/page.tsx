"use client";

import { useEffect, useState } from "react";
import GoldInstantPriceCard from "@/components/GoldInstantPriceCard";
import GoldTabSwitcher from "@/components/GoldTabSwitcher";
import GoldPriceForm from "@/components/GoldPriceForm";
import HeaderTitle from "@/components/HeaderTitle";

export default function Home() {
  const [price, setPrice] = useState<string>("");
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [disabledBtn,setDisabledBtn] = useState<boolean>(true);
  const toggleTab = (tabId: 1 | 2) => setActiveTab(tabId);
  function handleDisableBtn(priceprop:any ,sot:any){
    if (Number(priceprop) !== 0 || Number(sot) !==0) setDisabledBtn(false);
    else{
      setDisabledBtn(true);
    }
  }
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("https://testapi.shemsh.gold/api/app/gold/price");
        const data = await res.json();
        if (data?.price !== price) {
          setPrice(data?.price);
        }
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container-fluid flex justify-center h-screen">
      <div className="flex flex-col w-[360px] md:w-[600px] pt-6 border justify-between shadow-xl">
        <div>
          <HeaderTitle />
          <GoldInstantPriceCard price={price} />
          <GoldTabSwitcher activeTab={activeTab} toggleTab={toggleTab} />
          {activeTab === 1 && (
            <div>
              <GoldPriceForm priceprop={price} disabledBtnFn={handleDisableBtn} />
            </div>
          )}
        </div>
        <button className={`button--style ${disabledBtn ? "disabled":""} mb-4 mx-2 py-2`}>
          {activeTab === 1 ? "خرید طلا" : "فروش طلا"}
        </button>
      </div>
    </div>
  );
}
