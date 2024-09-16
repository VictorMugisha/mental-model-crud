require("dotenv").config();
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const cors = require("cors");
const {
  getAllItems,
  getSingeItem,
  addNewItem,
  updateItem,
  deleteItem,
} = require("./controllers/itemControllers");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Get all items
app.get("/", getAllItems);

// Get single item
app.get("/:itemId", getSingeItem);

// Create new item
app.post("/", addNewItem);

// Update an item
app.put("/:itemId", updateItem);

// Delete an item
app.delete("/:itemId", deleteItem);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
