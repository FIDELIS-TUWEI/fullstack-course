import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import personService from "./services/personService";


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
const Persons = ({ filteredPersons, handleDelete }) => {

  return (
    <div>
      {filteredPersons
        .map(person => (
          <p key={person.id}>
            {person.name} {person.number} 
            <button type="submit" onClick={() => handleDelete(person.id, person.name)}>Delete</button>
          </p>
        ))
      }
    </div>
  )
};

Persons.propTypes = {
  filteredPersons: PropTypes.array,
  handleDelete: PropTypes.func
}

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  // Fetch data from json-server with useEffect hook
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  // Function to add names to phonebook
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if the name already exists
    const nameExists = persons.find(person => person.name === newName);

    if (nameExists) {
      if (nameExists.id) {
        const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`);

        // logic to replace old number
        if (confirmUpdate) {
          try {
            const updatedPerson = {
              ...nameExists,
              number: newNumber
            }
            
            const response = await personService.editUser(nameExists.id, updatedPerson)
  
            setPersons(persons.map(person => (person.id === response.data.id ? response.data : person)))
            setNewName("");
            setNewNumber("");
          } catch (error) {
            console.error("Error updating person number: ", error)
          }
            
        }
      } else {
        console.error("Error Updating person", error)
      }
    } else {
      const newObject = {
        name: newName,
        number: newNumber
      }

      // add new name to phonebook
      personService
        .create(newObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        })
    }
  };

  // function to delete user
  const handleDelete = (userId, personName) => {
    const confirmDelete = window.confirm(`Delete ${personName}?`);

    if (confirmDelete) {
      personService
        .deleteUser(userId)
        .then(() => {
          setPersons(persons.filter(person => person.id !== userId))
        })
        .catch(error => {
          console.error("Error deleting person: ", error)
        })
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
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
};

export default App;
