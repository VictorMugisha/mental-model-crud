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
  const newItemId = storedItems.length + 1;
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
