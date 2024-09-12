require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  getAllItems,
  getSingeItem,
  addNewItem,
  updateItem,
} = require("./controllers/itemControllers");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

// Get all items
app.get("/", getAllItems);

// Get single item
app.get("/:itemId", getSingeItem);

// Create new item
app.post("/", addNewItem)

// Update an item
app.put("/:itemId", updateItem)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
