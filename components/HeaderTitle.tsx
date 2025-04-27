import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const HeaderTitle: React.FC = () => {
  return (
    <div className="flex items-center">
      <IoIosArrowRoundForward className="icon--style ms-4" />
      <h6 className="title">خرید و فروش طلا</h6>
    </div>
  );
};

export default HeaderTitle;
