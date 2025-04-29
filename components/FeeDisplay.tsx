"use client"
import { DisplayProps } from "@/types/price.interface";
import { calculateGoldFee } from "@/utils/validate";

function FeeDisplay({ sot, errors }: DisplayProps) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-xs text-grayDark font-IRANSansX font-medium"> کارمز خرید :</p>
      <p className="text-xs text-grayMed font-IRANSansX font-medium">
        {sot && !errors.sot ? <span className="mx-1 text-grayDark">{calculateGoldFee(sot)}</span> : 0} ریال
      </p>
    </div>
  );
}

export default FeeDisplay