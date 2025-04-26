"use client";
import { priceFormat } from "@/utils/validate";
import Image from "next/image";
import React from "react";
import { IoMdArrowDropup } from "react-icons/io";
import GoldIcon from "@/assets/images/gold-icon.svg";
function GoldInstantPriceCard({price}: {price:string}) {
  return (
    <div className="card-container custom-card">
      <div className="flex gap-2">
        <Image width={32} height={32} src={GoldIcon} alt="shemsh gold" />
        <div className="flex flex-col">
          <h6 className="text-primary text-[11px] font-medium font-IRANSansX">قیمت حال حاضر یک سوت طلا</h6>
          <p className="text-secondary text-[10px] font-medium font-IRANSansX">طلای 18 عیار</p>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <h6 className="text-primary text-[11px] font-medium font-IRANSansX">
            <span className="mx-1">{priceFormat(price)}</span>
            ریال
          </h6>
          <div className="flex items-center">
            <p className="text-success text-[10px] font-medium font-IRANSansX">{priceFormat("0.04")} %</p>
            <IoMdArrowDropup className="w-4 h-4 text-success" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoldInstantPriceCard;
