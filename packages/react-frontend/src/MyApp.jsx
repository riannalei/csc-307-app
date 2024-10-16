import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  //fetch users from the backend
  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  //useEffect to call fetchUsers when component mounts
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"])) 
      .catch((error) => console.log("Error fetching users:", error));
  }, []); 

  //remove a character from the list and backend
  function removeOneCharacter(index) {
    const userId = characters[index].id; // Get the user's ID
    fetch(`http://localhost:8000/users/${userId}`, { method: 'DELETE' })
      .then((res) => {
        if (res.status === 204) {
          const updated = characters.filter((_, i) => i !== index);
          setCharacters(updated);
        } else {
          console.error("Failed to delete user");
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  }

  //add a new character
  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  //update the list with a new person
  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json(); 
        } else {
          throw new Error('Failed to create user');
        }
      })
      .then((newUser) => setCharacters([...characters, newUser])) 
      .catch((error) => console.error("Error creating user:", error));
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
