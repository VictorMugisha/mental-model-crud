const fs = require("fs");
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

module.exports = { getAllItems, getSingeItem, addNewItem };
