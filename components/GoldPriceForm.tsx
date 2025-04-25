"use client";
import Image from "next/image";
import RialIcon from "@/assets/images/Vector.png";
import SotIcon from '@/assets/images/Gram.Sut.png';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { convertRialToToman, convertSotToGram } from "@/utils/validate";
function GoldPriceForm({ price }: { price: string }) {
  const gramPrice = 5000000; 
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      toman: "0",
      sot: "0",
    },
  });
  const [activeField, setActiveField] = useState<"toman" | "sot" | null>(null);
  const toman = watch("toman");
  const sot = watch("sot");
  // Update SOT when Toman is changed
  useEffect(() => {
    if (activeField === "toman") {
      const num = parseFloat(toman);
      if (!isNaN(num)) {
        const grams = num / gramPrice;
        const calculatedSot = grams * 100;
        setValue("sot", calculatedSot.toFixed(2), { shouldValidate: true });
      }
    }
  }, [toman]);
  // Update Toman when SOT is changed
  useEffect(() => {
    if (activeField === "sot") {
      const num = parseFloat(sot);
      if (!isNaN(num)) {
        const grams = num / 100;
        const calculatedToman = grams * gramPrice;
        setValue("toman", calculatedToman.toFixed(0), { shouldValidate: true });
      }
    }
  }, [sot]);

  return (
    <div className="mx-auto p-6 space-y-4">
      <div>
        <label className="input--label">مبلغ پرداختی با احتساب کارمزد</label>

        <div className="relative w-full mt-2">
          <input
            type="text"
            {...register("toman", {
              min: { value: price, message: `حداقل مبلغ طلا ${price} ریال می باشد` },
              max: { value: 200000000, message: "مبلغ پرداختی وارد شده بیشتر از سقف خرید روزانه است" },
            })}
            onFocus={() => setActiveField("toman")}
            className="w-full px-4 py-2 border border-lightpurple font-yekanBakh rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight"
          />

          <Image width={28} src={RialIcon} alt="Rial icon" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {errors.toman && <p className="text-red-500 text-sm mt-1">{errors.toman.message}</p>}
        <p className="text-xs mt-1 text-muted font-yekanBakh">{convertRialToToman(toman)}</p>
      </div>

      {/* SOT Input */}
      <div>
        <label className="input--label">مقدار طلا</label>
        <div className="relative w-full mt-2">
          <input
            type="text"
            {...register("sot", {
              min: { value: 1, message: "" },
              max: { value: 60000, message: "مبلغ پرداختی وارد شده بیشتر از سقف خرید روزانه است" },
            })}
            onFocus={() => setActiveField("sot")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:focus:ring-highlight"
          />
          <Image src={SotIcon} alt="Sot icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
        </div>

        {errors.sot && <p className="text-red-500 text-sm mt-1">{errors.sot.message}</p>}
        <p className="text-xs mt-1 text-muted font-yekanBakh">{convertSotToGram(sot)} گرم</p>
      </div>
    </div>
  );
}

export default GoldPriceForm;
