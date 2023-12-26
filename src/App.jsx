import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";


// Filter Component for search Logic
const Filter = ({ searchTerm, handleSearch }) => {

  return (
    <div>
      <input 
        type="search"
        value={searchTerm} 
        onChange={handleSearch} 
        placeholder="Search..."
      />
    </div>
  )
};

Filter.propTypes = {
  searchTerm: PropTypes.string,
  handleSearch: PropTypes.func
};

// Form Component for adding names to phonebook
const PersonForm = ({ handleFormSubmit, handleNameChange, handleNumberChange, newName, newNumber }) => {

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
};

PersonForm.propTypes = {
  handleFormSubmit: PropTypes.func,
  handleNameChange: PropTypes.func,
  handleNumberChange: PropTypes.func,
  newName: PropTypes.string,
  newNumber: PropTypes.string
};

// Component to render Persons
const Persons = ({ filteredPersons }) => {

  return (
    <div>
      {filteredPersons
        .map(person => <p key={person.name}>{person.name} {person.number}</p>)
      }
    </div>
  )
};

Persons.propTypes = {
  filteredPersons: PropTypes.array
}

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  // Fetch data from json-server with useEffect hook
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data);
      })
  }, []);

  // Function to add names to phonebook
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // check if the name already exists
    const nameExists = persons.some(person => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
    }
  };

  // function to handle input change
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  };

  // Function to filter persons by name
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <br />
      <h2>Add a new</h2>
      <PersonForm 
        handleFormSubmit={handleFormSubmit} handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} newName={newName} 
        newNumber={newNumber} 
      />
      <br />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
};

export default App;
