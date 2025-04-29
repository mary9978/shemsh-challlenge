import React from "react";
import { Controller, UseFormTrigger } from "react-hook-form";
import { toPersianDigits, toEnglishDigits } from "@/utils/validate";
import Image from "next/image";
import SotIcon from "@/assets/images/Gram.Sut.png";
import SotToGramDisplay from "./SotToGramDisplay";
import { MAX_SOT, MIN_SOT } from "@/utils/constants";

interface SotInputFieldProps {
  sot: string;
  control: any;
  trigger: UseFormTrigger<any>;
  errors: any;
}

const SotInputField: React.FC<SotInputFieldProps> = ({ sot, control, trigger, errors }) => {
  return (
    <div>
      <label className="input--label">مقدار طلا</label>
      <Controller
        name="sot"
        control={control}
        rules={{
          validate: (val) => {
            const num = parseInt(toEnglishDigits(val));
            if (num !== 0 && num < MIN_SOT) return "حداقل مقدار 1 سوت است";
            if (num > MAX_SOT) return "مبلغ پرداختی وارد شده بیشتر از سقف خرید روزانه است";
            return true;
          },
        }}
        render={({ field }) => (
          <div className="relative w-full mt-2">
            <input
              type="text"
              inputMode="numeric"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight ${
                errors.sot ? "border-red-500" : "border-gray-300"
              }`}
              value={toPersianDigits(field.value)}
              onBlur={() => trigger("sot")}
              onChange={(e) => {
                const englishValue = toEnglishDigits(e.target.value);
                field.onChange(englishValue);
              }}
            />
            <Image src={SotIcon} alt="Sot icon" className="inout--icon w-5 h-5" />
          </div>
        )}
      />
      {errors.sot && <p className="input--error">{errors.sot.message}</p>}
      <SotToGramDisplay sot={sot} errors={errors} />
    </div>
  );
};

export default SotInputField;