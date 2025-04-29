export function priceFormat(price: string) {
  return Number(price).toLocaleString("fa-IR");
}
export function convertRialToToman(rial: string) {
  const toman = Math.floor(Number(rial) / 10);
  const thousand = Math.floor(toman / 1000);
  const remainder = toman % 1000;
  let result = "";
  if (thousand > 0) result += `معادل ${thousand} هزار`;
  if (remainder === 0 && thousand > 0) result += "تومن";
  if (remainder > 0 && remainder !== thousand) result += `${thousand > 0 ? " و " : ""}${remainder} تومن`;

  return result || "";
}
export function convertSotToGram(sot: string): string {
  const grams = Number(sot) / 1000;
  const gramValue = Math.floor(grams * 1000) / 1000;
  return `معادل ${toPersianDigits(gramValue.toString())} گرم`;
}
// Format number with commas
export function formatWithCommas(num: string | number): string {
  return Number(num)
    .toLocaleString("en-US")
    .replace(/\d/g, (d) => String.fromCharCode(d.charCodeAt(0) + 1728));
}
export function priceToTomanText(price: string): string {
  const num = parseInt(toEnglishDigits(price).replace(/,/g, ""));
  if (isNaN(num) || num === 0) return "";
  const toman = Math.floor(num / 10); // convert Rial to Toman
  const million = Math.floor(toman / 1_000_000);
  const thousand = Math.floor((toman % 1_000_000) / 1_000);
  let result = "معادل ";
  if (million > 0) result += `${formatWithCommas(million)}  میلیون `;
  if (thousand > 0) result += `${formatWithCommas(thousand)} هزار `;
  result += "تومان";
  return result.trim();
}
// Convert Persian numbers to English
export function toEnglishDigits(str: string): string {
  return str.replace(/[\u06F0-\u06F9]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728));
}
// Remove commas and convert to number safely
export function parseCleanNumber(value: string): number {
  const raw = toEnglishDigits(value).replace(/,/g, "");
  const num = parseInt(raw);
  return isNaN(num) ? 0 : num;
}
export function calculateGoldFee(weightSoot:string) {
  const feePerSoot = 335.05; 
  const fee = Number(weightSoot) * feePerSoot;
  const persianNumberFee = toEnglishDigits(Math.round(fee).toString()).replace(/,/g, "");
  return formatWithCommas(persianNumberFee); 
}
export const toPersianDigits = (str: string): string => {
  return str.replace(/\d/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
};
