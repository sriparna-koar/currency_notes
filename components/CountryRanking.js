// // components/CountryRanking.js
// import { useState, useEffect } from 'react';

// const CountryRanking = () => {
//   const [countryRanking, setCountryRanking] = useState([]);

//   useEffect(() => {
//     const fetchCountryRanking = async () => {
//       try {
//         const response = await fetch(
//           'https://restcountries.com/v3.1/all?fields=name,population'
//         );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch data: ${response.status}`);
//         }

//         const data = await response.json();

//         const sortedCountries = data.sort(
//           (a, b) => b.population - a.population
//         );

//         setCountryRanking(sortedCountries);
//       } catch (error) {
//         console.error('Error fetching country ranking:', error);
//       }
//     };

//     fetchCountryRanking();
//   }, []);

//   return (
//     <div>
//       <h2>Country Ranking</h2>
//       <ol>
//         {countryRanking.map((country) => (
//           <li key={country.name.common}>
//             {country.name.common} - Population: {country.population}
//           </li>
//         ))}
//       </ol>
//     </div>
//   );
// };

// export default CountryRanking;


import { useState, useEffect } from 'react';

const CountryRanking = () => {
  const [countryRanking, setCountryRanking] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;

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

  const filteredCountries = countryRanking.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Country Ranking</h2>
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ol>
        {currentCountries.map((country) => (
          <li key={country.name.common}>
            {country.name.common} - Population: {country.population}
          </li>
        ))}
      </ol>
      {/* Pagination */}
      <div>
        {Array.from({ length: Math.ceil(filteredCountries.length / countriesPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountryRanking;
