const fs = require("fs");

const filePath = "./data.json";

exports.find = function () {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
  const jsonItems = fs.readFileSync(filePath, "utf8");
  const storedItems = JSON.parse(jsonItems);
  return storedItems.map((item) => ({
    ...item,
    id: parseInt(item.id),
  }));
};

exports.findById = function (id) {
  const storedItems = exports.find();
  const item = storedItems.find((item) => item.id === parseInt(id));
  return item;
};

exports.createItem = function (newItem) {
  // Basic validation
  if (
    typeof newItem !== "object" ||
    !newItem.hasOwnProperty("title") ||
    Object.keys(newItem).length > 1
  ) {
    throw new Error("Invalid Item!");
  }

  const storedItems = exports.find();
  const newItemId = storedItems[storedItems.length - 1].id + 1;
  const item = {
    id: newItemId,
    title: newItem.title,
  };

  storedItems.push(item);

  try {
    fs.writeFileSync(filePath, JSON.stringify(storedItems));
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

exports.findByIdAnUpdate = function (id, data) {
  const item = exports.findById(id);
  if (!item) {
    throw new Error("Invalid item id!");
  }

  if (
    typeof data !== "object" ||
    !data.hasOwnProperty("title") ||
    Object.keys(data).length > 1
  ) {
    throw new Error("Invalid Item!");
  }

  const newItem = {
    id,
    title: data.title,
  };

  const storedItems = exports.find();
  const newData = storedItems.map((item) => (item.id === id ? newItem : item));

  try {
    fs.writeFileSync(filePath, JSON.stringify(newData));
    return newItem;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findByIdAndDelete = function (itemId) {
  const item = exports.findById(itemId);

  if (!item) {
    throw new Error("Invalid item id!");
  }

  const storedItems = exports.find();
  const newData = storedItems.filter((item) => item.id !== itemId);

  try {
    fs.writeFileSync(filePath, JSON.stringify(newData));
    return item;
  } catch (error) {
    throw new Error(error.message);
  }
};
