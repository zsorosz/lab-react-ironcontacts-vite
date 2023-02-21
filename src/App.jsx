import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  const [contactList, setContactList] = useState(contacts.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = useState(contacts.slice(6));

  const addRandom = () => {
    let randomIndex = Math.floor(Math.random() * remainingContacts.length);
    let randomContact = remainingContacts[randomIndex];
    setContactList([...contactList, randomContact]);
    let filteredArr = remainingContacts.filter((el, index) => {
      return el.name !== randomContact.name;
    });
    setRemainingContacts(filteredArr);
    console.log(randomIndex, randomContact);
  };
  const sortByName = () => {
    const sortedList = contactList.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
    });
    setContactList([...sortedList]);
  };
  const sortByPopularity = () => {
    const sortedList = contactList.sort((a, b) => b.popularity - a.popularity);
    setContactList([...sortedList]);
  };
  const deleteContact = (event) => {
    const id = event.target.id;
    const filteredArr = contactList.filter((contact) => {
      return contact.id !== id;
    });
    setContactList([...filteredArr]);
  };

  return (
    <div className="App">
      <h1>Ironcontacts</h1>
      <button onClick={addRandom}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <button onClick={sortByName}>Sort by Name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((el) => (
            <tr key={el.id}>
              <td>
                <img width="50" src={el.pictureUrl} alt="celeb" />
              </td>
              <td>{el.name}</td>
              <td>{el.popularity.toFixed(2)}</td>
              <td>{el.wonOscar ? "🏆" : ""}</td>
              <td>{el.wonEmmy ? "🏆" : ""}</td>
              <td>
                <button id={el.id} onClick={deleteContact}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
