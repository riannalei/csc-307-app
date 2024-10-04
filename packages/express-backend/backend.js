import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

// GET all users, optionally filtered by name or job
app.get('/users', (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  const filteredUsers = users.users_list.filter((user) => {
    return (!name || user.name === name) && (!job || user.job === job);
  });

  res.send({ users_list: filteredUsers });
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.users_list.find((user) => user.id === id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send("User not found.");
  }
});

// POST to add a new user with a randomly generated ID
app.post('/users', (req, res) => {
  const userToAdd = req.body;

  if (!userToAdd.name || !userToAdd.job) {
    return res.status(400).send("Invalid user data.");
  }

  // Generate random ID and add user
  userToAdd.id = Math.random().toString(36).substring(7);
  users.users_list.push(userToAdd);
  res.status(201).send(userToAdd);
});

// DELETE a user by ID
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const index = users.users_list.findIndex((user) => user.id === id);

  if (index !== -1) {
    users.users_list.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("User not found.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
