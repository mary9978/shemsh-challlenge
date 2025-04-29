import { DisplayProps } from "@/types/price.interface";
import { convertSotToGram } from "@/utils/validate";
import React from "react";

function SotToGramDisplay({ sot, errors }: DisplayProps) {
  return <div>{Number(sot) !== 0 && !errors.sot && <p className="text-xs mt-1 text-muted font-IRANSansX">{convertSotToGram(sot)}</p>}</div>;
}

export default SotToGramDisplay;
