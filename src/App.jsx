import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" }
  ])

  const [newName, setNewName] = useState("");

  const addnames = (event) => {
    event.preventDefault();

    // check if the name already exists
    const nameExists = persons.some(person => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName }));
      setNewName("");
    }
  };

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addnames}>
        <div>
          Name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
};

export default App;
