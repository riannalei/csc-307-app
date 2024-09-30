import express from 'express';

const app = express();
const port = 8000;

app.use(express.json());

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

// Default route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET route to return users, optionally filtered by name or job
app.get('/users', (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  // Filter users by name and job if provided
  const filteredUsers = users.users_list.filter((user) => {
    return (!name || user.name === name) && (!job || user.job === job);
  });

  res.send({ users_list: filteredUsers });
});

// GET route to find a user by ID
const findUserById = (id) => {
  return users.users_list.find((user) => user.id === id);
};

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = findUserById(id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send("User not found.");
  }
});

// POST route to add a new user
const addUser = (user) => {
  users.users_list.push(user);
  return user;
};

app.post('/users', (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send(userToAdd); // Send 201 Created status
});

// DELETE route to remove a user by ID
const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.users_list.splice(index, 1); // Remove user
    return true;
  }
  return false;
};

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const success = deleteUserById(id);
  if (success) {
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).send("User not found.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
