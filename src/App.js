import "./App.css";
import React, { useEffect, useState } from "react";
import CurrencyRow from "./currencyRow";
const BASE_URL = "https://open.exchangerate-api.com/v6/latest/USD";

function App() {
  const [fromCurrency, setfromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const firstCurrency = Object.keys(data.base_code);
        const secondCurrency = Object.keys(data.rates)[44];
        setfromCurrency(firstCurrency);
        setToCurrency(secondCurrency);
        setExchangeRate(data.rates[secondCurrency]);
      });
  }, []);
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base_code=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);
  function handleFromAmount(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmount(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <CurrencyRow
        selectedCurrency={fromCurrency}
        amount={fromAmount}
        onchangeAmount={handleFromAmount}
        placeHolder="USD"
      />
      <h1> = </h1>
      <CurrencyRow
        selectedCurrency={toCurrency}
        amount={toAmount}
        onchangeAmount={handleToAmount}
        placeHolder="EUR"
      />
    </div>
  );
}
export default App;
