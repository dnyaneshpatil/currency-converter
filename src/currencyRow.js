import React from "react";

function currencyRow({ onchangeAmount, amount, placeHolder }) {
  return (
    <div>
      <div>{placeHolder}</div>
      <input type="number" value={amount} onChange={onchangeAmount} />
    </div>
  );
}
export default currencyRow;
