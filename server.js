// Import the required modules
const express = require("express");
const fs = require("fs");
const path = require("path");
// const { v4: uuidv4 } = require("uuid");

// Create an instance of an Express application
const app = express();

// Define the port the server will listen on
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// TODO:  Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Define the path to the JSON file
const dataFilePath = path.join(__dirname, "data.json");

// Function to read data from the JSON file
const readData = () => {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};
