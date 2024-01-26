// components/CountryRanking.js
import { useState, useEffect } from 'react';

const CountryRanking = () => {
  const [countryRanking, setCountryRanking] = useState([]);

  useEffect(() => {
    const fetchCountryRanking = async () => {
      try {
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,population'
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();

        const sortedCountries = data.sort(
          (a, b) => b.population - a.population
        );

        setCountryRanking(sortedCountries);
      } catch (error) {
        console.error('Error fetching country ranking:', error);
      }
    };

    fetchCountryRanking();
  }, []);

  return (
    <div>
      <h2>Country Ranking</h2>
      <ol>
        {countryRanking.map((country) => (
          <li key={country.name.common}>
            {country.name.common} - Population: {country.population}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CountryRanking;
