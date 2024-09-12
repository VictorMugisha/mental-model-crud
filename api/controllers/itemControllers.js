const ItemModel = require("../model/itemModel");

function getAllItems(req, res) {
  const all = ItemModel.find();
  res.status(200).json(all);
}

function getSingeItem(req, res) {
  const itemId = req.params.itemId;
  const targetItem = ItemModel.findById(itemId);

  if (!targetItem) {
    res.status(404).json({ error: "Could not find the item with given id!" });
  }

  res.status(200).json(targetItem);
}

function addNewItem(req, res) {
  const data = req.body;
  try {
    const newItem = ItemModel.createItem(data);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: "Could not add item" });
  }
}

function updateItem(req, res) {
  const itemId = req.params.itemId;
  const data = req.body;

  try {
    const updatedItem = ItemModel.findByIdAnUpdate(parseInt(itemId), data);
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

function deleteItem(req, res) {
    const itemId = req.params.itemId;
    
    try {
      const updatedItem = ItemModel.findByIdAndDelete(parseInt(itemId));
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

module.exports = {
  getAllItems,
  getSingeItem,
  addNewItem,
  updateItem,
  deleteItem,
};
