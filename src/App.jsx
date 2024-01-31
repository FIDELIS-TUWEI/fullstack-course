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
const Countries = ({ filterCountries }) => {
  if (filterCountries.length > 10) {
    return <p>More than 10 countries match your search, please refine your search</p>
  };
  
  return (
    <div>
      {filterCountries
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
  filterCountries: PropTypes.array,
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
  const filterCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10);

  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <Countries filterCountries={filterCountries} />
    </div>
  )
};

export default App;
