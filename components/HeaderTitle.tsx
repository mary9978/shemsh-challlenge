import React from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io';

function HeaderTitle() {
  return (
    <div className="flex gap-8 jus items-center">
      <IoIosArrowRoundForward className="icon--style ms-4" />
      <h6 className="title">خرید و فروش طلا</h6>
    </div>
  );
}

export default HeaderTitle