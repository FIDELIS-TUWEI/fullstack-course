import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import countryService from './services/countryService';

// Search component
const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
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
const Countries = ({ countries }) => {
  return (
    <div>
      {countries
        .map(country => (
          <p key={country.name.common}>
            {country.name.common}
          </p>
        ))
      }
    </div>
  )
};

Countries.propTypes = {
  countries: PropTypes.array,
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
  //const filterCountries = countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <Countries countries={countries} />
    </div>
  )
};

export default App;
