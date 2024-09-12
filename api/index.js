require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
    const jsonItems = fs.readFileSync("./data.json", "utf8");
    const storedItems = JSON.parse(jsonItems);
    res.status(200).json(storedItems);
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
