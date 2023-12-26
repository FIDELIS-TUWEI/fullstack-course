import PropTypes from "prop-types";
import { useState } from "react";


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
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
      <form onSubmit={handleFormSubmit}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
          <br />
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )
};

export default App;
