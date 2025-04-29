"use client";
import { Controller } from "react-hook-form";
import { formatWithCommas, parseCleanNumber, priceToTomanText, toEnglishDigits, toPersianDigits } from "@/utils/validate";

interface PriceInputFieldProps {
  price: string;
  priceprop: string;
  control: any;
  trigger: (name: string) => void;
  errors: any;
  setValue: (name: string, value: any, options?: any) => void;
}

const PriceInputField: React.FC<PriceInputFieldProps> = ({ price, priceprop, control, trigger, errors }) => {
  return (
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
              value={toPersianDigits(field.value)}
              onBlur={() => trigger("price")}
              onChange={(e) => {
                const raw = toEnglishDigits(e.target.value).replace(/,/g, "");
                const formatted = formatWithCommas(raw);
                field.onChange(formatted);
              }}
            />
            <span className="inout--icon text-xs text-grayMed font-bold">ریال</span>
          </div>
        )}
      />
      {errors.price && <p className="input--error">{errors.price.message}</p>}
      {Number(price) !== 0 && !errors.price && <p className="text-xs mt-1 text-muted font-IRANSansX">{priceToTomanText(price)}</p>}
    </div>
  );
};

export default PriceInputField;
