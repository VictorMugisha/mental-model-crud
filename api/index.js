require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

// Get all items
app.get("/", (req, res) => {
  const jsonItems = fs.readFileSync("./data.json", "utf8");
  const storedItems = JSON.parse(jsonItems);
  res.status(200).json(storedItems);
});

// Get single item
app.get("/:itemId", (req, res) => {
  const jsonItems = fs.readFileSync("./data.json", "utf8");
  const storedItems = JSON.parse(jsonItems);

  const itemId = req.params.itemId;
  console.log(storedItems, itemId)
  const targetItem = storedItems.find((item) => item.id === itemId);

  if (!targetItem) {
    res.status(404).json({ error: "Could not find the item with given id!" });
  }

  res.status(200).json(targetItem)
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
