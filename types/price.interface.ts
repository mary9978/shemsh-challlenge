interface GoldPriceType{
    price: string;
    rate:number;
    updated_at:string
}
export interface TabSwitcherProps {
  activeTab: number;
  toggleTab: (tabIndex: number) => void;
}
export interface PriceFormType {
  priceprop: string;
  disabledBtnFn: (priceprop: any, sot: any) => void;
}