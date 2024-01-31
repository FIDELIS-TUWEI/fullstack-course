import PropTypes from 'prop-types';
import { useState } from 'react';

// Search component
const Filter = ({ search, handleSearch }) => {
  return (
    <div>
      <input type='search' onChange={handleSearch} />
    </div>
  )
};

Filter.propTypes = {
  search: PropTypes.string,
  handleSearch: PropTypes.func
}

const App = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div>
      <Filter search={search} handleSearch={handleSearch} />
    </div>
  )
};

export default App;
