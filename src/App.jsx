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
};

// Notification component
const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  // logic to determine success or error Notification display
  const className = type === 'success' ? 'success' : 'error'

  return (
    <div className={className}>
      {message}
    </div>
  )
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error']),
}

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


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
    const existingPerson = findExistingPerson(newName)

    if (existingPerson) {
      await handleExistingPersonUpdate(existingPerson);
    } else {
      await handleNewPersonCreation()
    }
  };

  // Logic to find existing person
  const findExistingPerson = (name) => {
    return persons.find(person => person.name === name);
  }

  // Logic to handle existing person update
  const handleExistingPersonUpdate = async (existingPerson) => {
    const confirmUpdate = window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with the new one?`);

    if (confirmUpdate) {
      try {
        const updatedPerson = await updatePersonNumber(existingPerson);
        setSuccessMessage(
          `Number for ${existingPerson.name} updated succesfully`
        );
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);

        updatePersonsList(updatedPerson);
        clearInputFields();
      } catch (error) {
        console.error("Error updating person number: ", error);
        setErrorMessage(
          `Error while updating ${existingPerson.name} number`
        )
      }
    }
  };

  // Logic to update person number
  const updatePersonNumber = async (person) => {
    const updatedPerson = { ...person, number: newNumber };
    return await personService.editUser(person.id, updatedPerson);
  };

  // Logic to handle new person creation
  const handleNewPersonCreation = async () => {
    try {
      const newObject = { name: newName, number: newNumber };
      const response = await personService.create(newObject);
      
      if (response?.data?.id) {
        setSuccessMessage(
        `Added ${newName} to the phonebook`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000);

        updatePersonsList(response.data);
        clearInputFields();
      } else {
        setErrorMessage(
        `An Error occured when creating ${newName}`
        );
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        }
    } catch (error) {
      console.error("Error creating new person: ", error.response.data.errors);
      setErrorMessage(error.response.data.errors);
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  };

  // Logic to update person list
  const updatePersonsList = (updatedPerson) => {
    setPersons(persons.map(person => (person.id === updatedPerson.id ? updatedPerson : person)));
  };

  // Logic to clear input fields 
  const clearInputFields = () => {
    setNewName("");
    setNewNumber("");
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
          setErrorMessage(
            `Information of ${personName}, has already deleted in the server.`
          )
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000)
        });
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
      <h1>Phonebook</h1>
      <Notification message={successMessage} type='success' />
      <Notification message={errorMessage} type='error' />
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