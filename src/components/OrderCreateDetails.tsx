import React from 'react';

const OrderCreateDetails = ({totalPrice, totalProducts}: {totalPrice: number, totalProducts: number}) => {
  return (
    <div>
      <div className="pt-2">
        <h2>
          Sifariş vaxtı:<span> 13.10.2023</span>
        </h2>
      </div>
      <div className="pt-2">
        <h2>
          Ümumi məhsul sayı:<span> {totalProducts}</span>
        </h2>
      </div>
      <div className="py-2">
        <h2>
          Toplam məbləğ:<span> {totalPrice} AZN</span>
        </h2>
      </div>
    </div>
  );
};

export default OrderCreateDetails;
