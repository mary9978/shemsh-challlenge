"use client";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import RialIcon from "@/assets/images/Vector.png";
import SotIcon from "@/assets/images/Gram.Sut.png";
const SOT_PRICE = 63680;

// Format number with commas
function formatWithCommas(num: string | number): string {
  return Number(num)
    .toLocaleString("en-US")
    .replace(/\d/g, (d) => String.fromCharCode(d.charCodeAt(0) + 1728));
}
function priceToTomanText(price: string): string {
  const num = parseInt(toEnglishDigits(price).replace(/,/g, ""));
  if (isNaN(num)) return "";

  const toman = Math.floor(num / 10); // convert Rial to Toman
  const million = Math.floor(toman / 1_000_000);
  const thousand = Math.floor((toman % 1_000_000) / 1_000);

  let result = "معادل ";
  if (million > 0) result += `${formatWithCommas(million)} میلیون `;
  if (thousand > 0) result += `${formatWithCommas(thousand)} هزار `;
  result += "تومان";

  return result.trim();
}

// Convert Persian numbers to English
function toEnglishDigits(str: string): string {
  return str.replace(/[\u06F0-\u06F9]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728));
}

// Remove commas and convert to number safely
function parseCleanNumber(value: string): number {
  const raw = toEnglishDigits(value).replace(/,/g, "");
  const num = parseInt(raw);
  return isNaN(num) ? 0 : num;
}

export default function Formmm() {
  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: "",
      sot: "",
    },
  });
  const price = watch("price");
  const sot = watch("sot");

  // Convert price to sot
  useEffect(() => {
    if (!price) return; 

    const priceNum = parseCleanNumber(price);
    const newSot = Math.floor(priceNum / SOT_PRICE);
    if (!isNaN(newSot)) {
      setValue("sot", newSot.toString(), { shouldValidate: true });
    }
  }, [price]);

  // Convert sot to price
  useEffect(() => {
    if (!sot) return; 

    const sotNum = parseInt(toEnglishDigits(sot));
    if (!isNaN(sotNum)) {
      const priceValue = sotNum * SOT_PRICE;
      const formatted = formatWithCommas(priceValue);
      setValue("price", formatted, { shouldValidate: true });
    }
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
              if (num < 63690) return "کمتر از حداقل مجاز است";
              if (num > 2000000000) return "بیشتر از حداکثر مجاز است";
              return true;
            },
          }}
          render={({ field }) => (
            <div className="relative w-full mt-2">
              <input
                className={`w-full px-4 py-2 border border-lightpurple font-yekanBakh rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight ${
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
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        {price && !errors.price && <p className="text-xs mt-1 text-muted font-yekanBakh">{priceToTomanText(price)}</p>}
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
              if (num < 1) return "حداقل مقدار ۱ است";
              if (num > 60000) return "حداکثر مقدار ۹۹ است";
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
        {errors.sot && <p className="text-red-500 text-sm mt-1">{errors.sot.message}</p>}
      </div>
    </div>
  );
}
