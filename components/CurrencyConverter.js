// // components/CurrencyConverter.js
// import { useState } from 'react';

// const CurrencyConverter = () => {
//   const [amount, setAmount] = useState(1);
//   const [baseCurrency, setBaseCurrency] = useState('USD');
//   const [targetCurrency, setTargetCurrency] = useState('EUR');
//   const [convertedAmount, setConvertedAmount] = useState(null);

//   const convertCurrency = async () => {
//     try {
//       const response = await fetch(
//         `https://open.er-api.com/v6/latest/${baseCurrency}`
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch data: ${response.status}`);
//       }

//       const data = await response.json();

//       const exchangeRate = data.rates[targetCurrency];
//       const result = (amount * exchangeRate).toFixed(2);

//       setConvertedAmount(result);
//     } catch (error) {
//       console.error('Error fetching conversion rates:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Currency Converter</h2>
//       <div>
//         <label>
//           Amount:
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           From:
//           <input
//             type="text"
//             value={baseCurrency}
//             onChange={(e) => setBaseCurrency(e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           To:
//           <input
//             type="text"
//             value={targetCurrency}
//             onChange={(e) => setTargetCurrency(e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <button onClick={convertCurrency}>Convert</button>
//       </div>
//       {convertedAmount !== null && (
//         <div>
//           <p>
//             {amount} {baseCurrency} is equal to {convertedAmount}{' '}
//             {targetCurrency}.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrencyConverter;
// components/CurrencyConverter.js
import { useState } from 'react';

const CurrencyConverter = ({
  convertCurrencyFunction,
  amountFunction,
  baseCurrencyFunction,
  targetCurrencyFunction,
  convertedAmountFunction,
}) => {
  const [amount, setAmount] = useState(amountFunction || 1);
  const [baseCurrency, setBaseCurrency] = useState(baseCurrencyFunction || 'USD');
  const [targetCurrency, setTargetCurrency] = useState(targetCurrencyFunction || 'EUR');
  const [convertedAmount, setConvertedAmount] = useState(convertedAmountFunction || null);

  const convertCurrency = async () => {
    try {
      const result = await convertCurrencyFunction(baseCurrency, targetCurrency, amount);
      setConvertedAmount(result);
    } catch (error) {
      console.error('Error fetching conversion rates:', error);
    }
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          From:
          <input
            type="text"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          To:
          <input
            type="text"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={convertCurrency}>Convert</button>
      </div>
      {convertedAmount !== null && (
        <div>
          <p>
            {amount} {baseCurrency} is equal to {convertedAmount}{' '}
            {targetCurrency}.
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
