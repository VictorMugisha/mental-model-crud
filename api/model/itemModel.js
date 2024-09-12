const fs = require("fs");

class Item {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

exports.find = () => {
  const jsonItems = fs.readFileSync("./data.json", "utf8");
  const storedItems = JSON.parse(jsonItems);
  return storedItems.map(item => ({
      ...item,
      id: parseInt(item.id)
  }));
};

exports.findById = (id) => {
  const storedItems = exports.find();
  console.log("STORED ITEMS", storedItems)
  const item = storedItems.find((item) => item.id === parseInt(id));
  return item;
};
