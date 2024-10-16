import mongoose from "mongoose";
import User from "./user.js";
import dotenv from 'dotenv';

dotenv.config();  

console.log("MONGO_URI:", process.env.MONGO_URI); 

mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Failed to connect to MongoDB", error));


export function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = User.find(); 
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else {
    promise = User.find({ name: name, job: job }); 
  }
  return promise;
}

export function findUserById(id) {
  return User.findById(id);
}

export function addUser(user) {
  const userToAdd = new User(user);
  return userToAdd.save();
}

export function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}

export function findUserByName(name) {
  return User.find({ name: name });
}

export function findUserByJob(job) {
  return User.find({ job: job });
}
