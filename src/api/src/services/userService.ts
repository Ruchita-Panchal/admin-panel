import { User } from "../models/userModel";
import { hashPassword } from "../utils/hash";
import * as fs from "fs";

let users: User[] = require("../../data/users.json");

export const findUserByUsername = (username: string): User | undefined => {
  return users.find((user) => user.username === username);
};

export const createUser = (
  email: string,
  username: string,
  password: string
): User => {
  const newUser: User = {
    id: users.length + 1,
    email,
    username,
    role: "Guest",
    password: hashPassword(password),
  };
  users.push(newUser);
  saveUsers();
  return newUser;
};

function saveUsers() {
  try {
    fs.writeFileSync("./data/users.json", JSON.stringify(users), "utf-8");
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}
