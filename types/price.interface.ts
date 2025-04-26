interface GoldPriceType{
    price: string;
    rate:number;
    updated_at:string
}
export interface TabSwitcherProps {
  activeTab: number;
  toggleTab: (tabIndex: 1|2) => void;
}