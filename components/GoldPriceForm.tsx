"use client";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import RialIcon from "@/assets/images/Vector.png";
import SotIcon from "@/assets/images/Gram.Sut.png";
import { calculateGoldFee, convertSotToGram, formatWithCommas, parseCleanNumber, priceToTomanText, toEnglishDigits, toPersianDigits } from "@/utils/validate";
import { PriceFormType } from "@/types/price.interface";
const DEBOUNCE_DELAY = 1100;
export default function GoldPriceForm({ priceprop, disabledBtnFn }: PriceFormType) {
  const SOT_PRICE = Number(priceprop);
  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // price: toPersianDigits("0"),
      // sot: toPersianDigits("0"),
      price: "0",
      sot: "0",
    },
  });
  const price = watch("price");
  const sot = watch("sot");

  // Convert price to sot

  useEffect(() => {
    disabledBtnFn(price,sot);
    if (!price) return;

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
    disabledBtnFn(price,sot);
    if (!sot) return;

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
      <div>
        <label className="input--label">مبلغ پرداختی با احتساب کارمزد</label>
        <Controller
          name="price"
          control={control}
          rules={{
            validate: (val) => {
              const num = parseCleanNumber(val);
              if (num < Number(priceprop)) return `حداقل مقدار طلا ${formatWithCommas(priceprop)} ریال می باشد`;
              if (num > 2000000000) return "مبلغ پرداختی وارد شده بیشتر از سقف خرید روزانه است";
              return true;
            },
          }}
          render={({ field }) => (
            <div className="relative w-full mt-2">
              <input
                className={`w-full px-4 py-2 border border-lightpurple font-IRANSansX rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                inputMode="numeric"
                value={field.value}
                onBlur={() => trigger("price")}
                onChange={(e) => {
                  const raw = toEnglishDigits(e.target.value).replace(/,/g, "");
                  const formatted = formatWithCommas(raw);
                  field.onChange(formatted);
                }}
              />
              <Image width={28} src={RialIcon} alt="Rial icon" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          )}
        />
        {errors.price && <p className="input--error">{errors.price.message}</p>}
        {Number(price) !== 0 && !errors.price && <p className="text-xs mt-1 text-muted font-IRANSansX">{priceToTomanText(price)}</p>}
      </div>

      {/* Sot Input */}
      <div>
        <label className="input--label">مقدار طلا</label>
        <Controller
          name="sot"
          control={control}
          rules={{
            validate: (val) => {
              const num = parseInt(toEnglishDigits(val));
              if (num < 1) return "حداقل مقدار 1 سوت است";
              if (num > 60000) return "مبلغ پرداختی وارد شده بیشتر از سقف خرید روزانه است";
              return true;
            },
          }}
          render={({ field }) => (
            <div className="relative w-full mt-2">
              <input
                type="number"
                inputMode="numeric"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:focus:ring-highlight ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                value={field.value}
                onBlur={() => trigger("sot")}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9۰-۹]/g, "");
                  field.onChange(val);
                }}
              />
              <Image src={SotIcon} alt="Sot icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            </div>
          )}
        />
        {errors.sot && <p className="input--error">{errors.sot.message}</p>}
        {Number(sot) !==0 && !errors.sot && <p className="text-xs mt-1 text-muted font-IRANSansX">{convertSotToGram(sot)}</p>}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs text-grayDark font-IRANSansX font-medium"> کارمز خرید :</p>
        <p className="text-xs text-grayMed font-IRANSansX font-medium">
          {sot && !errors.sot ? <span className="mx-1 text-grayDark">{calculateGoldFee(sot)}</span> : 0}
          ریال
        </p>
      </div>
    </div>
  );
}
