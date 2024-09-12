const fs = require("fs");

function getAllItems(req, res) {
  const jsonItems = fs.readFileSync("./data.json", "utf8");
  const storedItems = JSON.parse(jsonItems);
  res.status(200).json(storedItems);
}

function getSingeItem(req, res) {
  const jsonItems = fs.readFileSync("./data.json", "utf8");
  const storedItems = JSON.parse(jsonItems);

  const itemId = req.params.itemId;
  const targetItem = storedItems.find((item) => item.id === itemId);

  if (!targetItem) {
    res.status(404).json({ error: "Could not find the item with given id!" });
  }

  res.status(200).json(targetItem);
}

module.exports = { getAllItems, getSingeItem };
