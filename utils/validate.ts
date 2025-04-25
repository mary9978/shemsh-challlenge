export function priceFormat(price:string){
     return Number(price).toLocaleString("en-US");
}
export function convertRialToToman(rial: string): string {
  const toman = Math.floor(Number(rial) / 10); 
  const thousand = Math.floor(toman / 1000);
  const remainder = toman % 1000;
  let result = "";
  if (thousand > 0 ) result += `معادل ${thousand} هزار`;
  if (remainder === 0 && thousand > 0) result += "تومن";
  if (remainder > 0 && remainder !== thousand) result += `${thousand > 0 ? " و " : ""}${remainder} تومن`;

  return result || "";
}
export function convertSotToGram(sot: string): number {
  const grams = Number(sot) / 100;
  return Math.floor(grams * 100) / 100; 
}
