import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import countryService from './services/countryService';

// Search component
const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <h3>Find Countries</h3>
      <input 
        type='searchTerm' 
        value={searchTerm} 
        onChange={handleSearch} 
        placeholder='Search...'
      />
    </div>
  )
};

Filter.propTypes = {
  searchTerm: PropTypes.string,
  handleSearch: PropTypes.func
};

// Component to display countries
const Countries = ({ filterCountries, handleView, selectedCountry }) => {
  if (filterCountries.length > 10) {
    return <p>More than 10 countries match your search, please refine your search</p>
  } else if ( selectedCountry) {
    const country = selectedCountry;
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital City: {country.capital}</p>
        <p>Total Area Covered: {country.area}</p>
        <p>Total Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <p>Sub-region: {country.subregion}</p>
        <p>Independent: {country.independent ? "Yes" : "No"}</p>
        <p>Landlocked: {country.landlocked ? "Yes" : "No"}</p>
        <p>Currency: 
          {Object.entries(country.currencies).map(([currencyCode, currencyDetails]) => (
            <li key={currencyCode}>{`${currencyDetails.name} (${currencyDetails.symbol})`}</li>
          ))}
        </p>
        <img src={`https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`} alt="Country Flag" />
        <p>Language (s):
          {Object.entries(country.languages).map(([languageCode, languageName]) => (
            <li key={languageCode}>
              {languageName}
            </li>
          ))}
        </p>
        <p>Start of the Week: {country.startOfWeek}</p>
        <p>Timezone: {country.timezones[0]}</p>
      </div>
    )
  } else {

    return (
      <div>
        {filterCountries
          .map(country => (
            <div key={country.name.common}>
              <p>{country.name.common}</p>
              <button onClick={() => handleView(`${country.name.common}`)}>View</button>
            </div>
          ))
        }
    </div>
  )}
};

Countries.propTypes = {
  filterCountries: PropTypes.array,
  handleView: PropTypes.func,
  selectedCountry: PropTypes.object
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Function to fetch countries
  useEffect(() => {
    countryService
      .getCountries()
      .then(prevState => {
        setCountries(prevState)
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to display searched countries
  const filterCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10);

  // Function to view Country details
  const handleView = (name) => {
    countryService
      .getCountryByName(name)
      .then((data) => {
        setSelectedCountry(data);
      })
      .catch(error => {
        console.log("Error:", error);
      })
  }

  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <Countries filterCountries={filterCountries} handleView={handleView} selectedCountry={selectedCountry} />
    </div>
  )
};

export default App;
