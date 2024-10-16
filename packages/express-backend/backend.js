import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  addUser,
  getUsers,
  findUserById,
  deleteUserById,
} from "./user-services.js";

// Load environment variables
dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// GET all users, optionally filtered by name and job
app.get("/users", (req, res) => {
  const { name, job } = req.query;
  getUsers(name, job)
    .then(users => res.json({ users_list: users }))
    .catch(err => res.status(500).send(err));
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  findUserById(id)
    .then(user => {
      if (user) res.send(user);
      else res.status(404).send("User not found.");
    })
    .catch(err => res.status(500).send(err));
});

// POST to add a new user
app.post("/users", (req, res) => {
  addUser(req.body)
    .then(user => res.status(201).send(user))
    .catch(err => res.status(500).send(err));
});

// DELETE a user by ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  deleteUserById(id)
    .then(() => res.status(204).send())
    .catch(err => res.status(500).send(err));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
