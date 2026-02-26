// Import the required modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

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

///////////////////////////////////////////////////////////////////////////////////////////////
// RETRIEVING ALL ROUTES

// app.get("/", (req,res) => {
//   res.send("server is fully working");
// });
// testing if the server is working

app.get("/data", (req, res) => {
  const data = readData();
  res.json(data);
});
// getting all the data

app.post("/data", (req, res) => {
  const newData = { id: uuidv4(), ...req.body };
  const currentData = readData();
  currentData.push(newData);
  writeData(currentData);
  res.json({ message: "Data saved successfully", data: newData });
}); 
// POST create new note
// Handle POST request to save new data with a unique ID
// (npm install uuid) - installed for this


app.put("/data/:id", (req, res) => {
  const freshData = readData();
  // obtains the list of all items
  const specificItem = freshData.find(i => i.id === req.params.id);
  // finds a specific item via the ID
  specificItem.name = req.body.name;
  // this updates the name with new information
  writeData(freshData);
  // this saves the new list to data.json
  res.json({message: "It has been updated"})
  
});

app.delete("/data/:id", (req, res) => {
  const freshData = readData();
  const specificItem = freshData.find(i => i.id === req.params.id);
  const item = freshData.indexOf(specificItem);
  // finds the item is inside the array
  freshData.splice(item, 1);
  // eradicates the item from the array
  writeData(freshData);
  // saves the new list to data.json
  res.json({message: "This has been deleted!!!"});

});




// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
