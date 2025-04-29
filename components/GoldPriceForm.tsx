"use client";
import {  useForm } from "react-hook-form";
import { useEffect } from "react";
import { formatWithCommas, parseCleanNumber, priceToTomanText, toEnglishDigits } from "@/utils/validate";
import { PriceFormType } from "@/types/price.interface";
import FeeDisplay from "./FeeDisplay";
import PriceInputField from "./PriceInputField";
import SotInputField from "./SotInputField";
interface FormFields {
  price: string;
  sot: string;
}
const DEBOUNCE_DELAY = 1100;
export default function GoldPriceForm({ priceprop, disabledBtnFn }: PriceFormType) {
  const SOT_PRICE = Number(priceprop);
  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      price: "0",
      sot: "0",
    },
  });
  // watch value
  const price = watch("price");
  const sot = watch("sot");
  // Convert price to sot
  useEffect(() => {
    disabledBtnFn(price, sot);
    if (!price) return;
    if (!SOT_PRICE) {
      setValue("sot", "0");
    }
    const handler = setTimeout(() => {
      const priceNum = parseCleanNumber(price);
      const newSot = Math.floor(priceNum / SOT_PRICE);
      if (!isNaN(newSot)) {
        setValue("sot", newSot.toString(), { shouldValidate: true });
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [price]);
  // Convert sot to price
  useEffect(() => {
    disabledBtnFn(price, sot);
    if (!sot) return;
    if (!SOT_PRICE) {
      setValue("price", "0");
    }
    const handler = setTimeout(() => {
      const sotNum = parseInt(toEnglishDigits(sot));
      if (!isNaN(sotNum) && sotNum !== 0) {
        const priceValue = sotNum * SOT_PRICE;
        const formatted = formatWithCommas(priceValue);
        setValue("price", formatted, { shouldValidate: true });
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [sot]);
  return (
    <div className="mx-auto p-6 space-y-4">
      {/* Price Input Field */}
      <PriceInputField price={price} priceprop={priceprop} control={control} trigger={trigger} errors={errors} />
      {/* Sot Input Field */}
      <SotInputField sot={sot} control={control} trigger={trigger} errors={errors} />
      {/* Fee Display */}
      <FeeDisplay sot={sot} errors={errors} />
    </div>
  );
}
