Lab: Getting started with GIT and React
IA 1: First React App

In myApp.jsx, I'm managing the state for the list of characters (each with a name and a job). This is where I handle adding new characters and removing existing ones.

In Table.jsx, I'm not managing any state directly. Instead, the list of characters is passed down from MyApp as props. This component is focused on displaying the characters in a table and handling the delete actions when someone wants to remove a character.

In Form.jsx, I manage the state for a single character (which includes their name and job). This component handles all the form input and, when the form is submitted, it sends the new character data back to MyApp to update the overall list.