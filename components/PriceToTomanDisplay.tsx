import { priceToTomanText } from "@/utils/validate";
import React from "react";
interface PriceDisplayType {
  price: string;
  errors: any;
}
// display the price conversion to toman
function PriceToTomanDisplay({ price, errors }: PriceDisplayType) {
  return (
    <div>{Number(price) !== 0 && !errors.price && <p className="text-xs mt-1 text-muted font-IRANSansX">{priceToTomanText(price)}</p>}</div>
  );
}

export default PriceToTomanDisplay;
