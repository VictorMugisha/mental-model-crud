require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { getAllItems, getSingeItem } = require("./controllers/itemControllers");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

// Get all items
app.get("/", getAllItems);

// Get single item
app.get("/:itemId", getSingeItem);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
