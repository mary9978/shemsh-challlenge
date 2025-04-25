"use client";

import { useEffect, useState } from "react";
import { IoIosArrowRoundForward, IoMdArrowDropup } from "react-icons/io";
import GoldInstantPriceCard from "@/components/GoldInstantPriceCard";
import GoldTabSwitcher from "@/components/GoldTabSwitcher";
import GoldPriceForm from "@/components/GoldPriceForm";
export default function Home() {
  const [price, setPrice] = useState<string>("");
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const toggleTab = (tabId: 1 | 2) => setActiveTab(tabId);
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("https://testapi.shemsh.gold/api/app/gold/price");
        const data = await res.json();
        setPrice(data?.price);
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
      <div className="flex flex-col w-[360px] lg:w-[600px] pt-6 border justify-between shadow-xl">
        <div>

 <div className="flex gap-8 items-center">
          <IoIosArrowRoundForward className="w-6 h-6 ms-4" />
          <h6 className="text-lg text-primary text-yekanBakh font-font-medium text-center">خرید و فروش طلا</h6>
        </div>
        <GoldInstantPriceCard price={price} />
        <GoldTabSwitcher activeTab={activeTab} toggleTab={toggleTab} />
        {activeTab === 1 && (
          <div> 
            <GoldPriceForm price={price} />
          </div>
        )}


        </div>
       
        <button className="active--tab mb-4 mx-2 py-2">{activeTab === 1 ? 'خرید طلا':'فروش طلا'}</button>
      </div>
    </div>
  );
}
