// // pages/index.js
// import { useState, useEffect } from 'react';
// import CurrencyConverter from '../components/CurrencyConverter';
// import CountryRanking from '../components/CountryRanking';

// const Home = () => {
//   const [convertedAmount, setConvertedAmount] = useState(null);

//   const convertCurrency = async (baseCurrency, targetCurrency, amount) => {
//     try {
//       const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch data: ${response.status}`);
//       }

//       const data = await response.json();
//       const exchangeRate = data.rates[targetCurrency];
//       return (amount * exchangeRate).toFixed(2);
//     } catch (error) {
//       console.error('Error fetching conversion rates:', error);
//       return null;
//     }
//   };

//   const fetchCountryRanking = async () => {
//     try {
//       const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population');
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch data: ${response.status}`);
//       }

//       const data = await response.json();
//       const sortedCountries = data.sort((a, b) => b.population - a.population);
//       return sortedCountries;
//     } catch (error) {
//       console.error('Error fetching country ranking:', error);
//       return [];
//     }
//   };

//   useEffect(() => {
//     fetchCountryRanking().then(setConvertedAmount);
//   }, []);

//   return (
//     <div>
//       <CurrencyConverter
//         convertCurrencyFunction={convertCurrency}
//         amountFunction={1}
//         baseCurrencyFunction={'USD'}
//         targetCurrencyFunction={'EUR'}
//         convertedAmountFunction={convertedAmount}
//       />
//       <CountryRanking countryRanking={convertedAmount} />
//     </div>
//   );
// };

// export default Home;



// import { useState, useEffect } from 'react';
// import CurrencyConverter from '../components/CurrencyConverter';
// import CountryRanking from '../components/CountryRanking';

// const Home = () => {
//   const [convertedAmount, setConvertedAmount] = useState(null);
//   const [cityPopulation, setCityPopulation] = useState(null);

//   const convertCurrency = async (baseCurrency, targetCurrency, amount) => {
//     try {
//       const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch data: ${response.status}`);
//       }

//       const data = await response.json();
//       const exchangeRate = data.rates[targetCurrency];
//       return (amount * exchangeRate).toFixed(2);
//     } catch (error) {
//       console.error('Error fetching conversion rates:', error);
//       return null;
//     }
//   };

//   const fetchCountryRanking = async () => {
//     try {
//       const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population');
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch data: ${response.status}`);
//       }

//       const data = await response.json();
//       const sortedCountries = data.sort((a, b) => b.population - a.population);
//       setConvertedAmount(sortedCountries);
//     } catch (error) {
//       console.error('Error fetching country ranking:', error);
//       setConvertedAmount([]);
//     }
//   };

//   const fetchCityPopulation = async () => {
//     try {
//       const response = await fetch('https://restcountries.com/v3.1/capital/london');

//       if (!response.ok) {
//         throw new Error(`Failed to fetch data: ${response.status}`);
//       }

//       const data = await response.json();
//       const population = data[0]?.population;
//       setCityPopulation(population);
//     } catch (error) {
//       console.error('Error fetching city population:', error);
//       setCityPopulation(null);
//     }
//   };

//   useEffect(() => {
//     fetchCountryRanking();
//     fetchCityPopulation();
//   }, []);

//   return (
//     <div>
//       <CurrencyConverter
//         convertCurrencyFunction={convertCurrency}
//         amountFunction={1}
//         baseCurrencyFunction={'USD'}
//         targetCurrencyFunction={'EUR'}
//         convertedAmountFunction={convertedAmount}
//       />
//       <CountryRanking countryRanking={convertedAmount} cityPopulation={cityPopulation} />
//     </div>
//   );
// };

// export default Home;


import { useState, useEffect } from 'react';
import CurrencyConverter from '../components/CurrencyConverter';
import CountryRanking from '../components/CountryRanking';

const Home = () => {
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [cityPopulation, setCityPopulation] = useState(null);

  const convertCurrency = async (baseCurrency, targetCurrency, amount) => {
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      const exchangeRate = data.rates[targetCurrency];
      return (amount * exchangeRate).toFixed(2);
    } catch (error) {
      console.error('Error fetching conversion rates:', error);
      return null;
    }
  };

  const fetchCountryRanking = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      const sortedCountries = data.sort((a, b) => b.population - a.population);
      setConvertedAmount(sortedCountries);
    } catch (error) {
      console.error('Error fetching country ranking:', error);
      setConvertedAmount([]);
    }
  };

  const fetchCityPopulation = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/capital/london');

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      const population = data[0]?.population;
      setCityPopulation(population);
    } catch (error) {
      console.error('Error fetching city population:', error);
      setCityPopulation(null);
    }
  };

  useEffect(() => {
    fetchCountryRanking();
    fetchCityPopulation();
  }, []);

  return (
    <div className="container mx-auto mt-8 p-6">
      <CurrencyConverter
        convertCurrencyFunction={convertCurrency}
        amountFunction={1}
        baseCurrencyFunction={'USD'}
        targetCurrencyFunction={'EUR'}
        convertedAmountFunction={convertedAmount}
      />
      <CountryRanking countryRanking={convertedAmount} cityPopulation={cityPopulation} />
    </div>
  );
};

export default Home;
