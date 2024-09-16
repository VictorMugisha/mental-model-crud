const ItemModel = require("../model/itemModel");

/**
 * @swagger
 * /:
 *  get:
 *    summary: Get all items
 *    description: Retrieve the list of all items from the database
 *    responses:
 *      200:
 *        description: Returns a list of all items
 *        content:
 *          application/json:
 *            schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      description: The id of the item
 *                      example: 1
 *                    title:
 *                      type: string
 *                      description: The title of the item
 *                      example: Item 1
 */
function getAllItems(req, res) {
  const all = ItemModel.find();
  res.status(200).json(all);
}

/**
 * @swagger
 * /{itemId}:
 *  get:
 *    summary: Get single item
 *    description: Retrieve a single item from the database
 *    parameters:
 *      - in: path
 *        name: itemId
 *        required: true
 *        schema:
 *          type: integer
 *        description: The item's id
 *    responses:
 *      200:
 *        description: Returns a single item
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The id of the item
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: The title of the item
 *                   example: Item 1
 *      404:
 *        description: Item not found
 */

function getSingeItem(req, res) {
  const itemId = req.params.itemId;
  const targetItem = ItemModel.findById(itemId);

  if (!targetItem) {
    res.status(404).json({ error: "Could not find the item with given id!" });
  }

  res.status(200).json(targetItem);
}

/**
 * @swagger
 * /:
 *  post:
 *    summary: Create new item
 *    description: Create a new item in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: The title of the item
 *                example: Item 1
 *    responses:
 *      201:
 *        description: Returns the newly created item
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                    description: The id of the item
 *                    example: 1
 *                 title:
 *                   type: string
 *                   description: The title of the item
 *                   example: Item 1
 *      400:
 *        description: Bad request
 */
function addNewItem(req, res) {
  const data = req.body;
  try {
    const newItem = ItemModel.createItem(data);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: "Could not add item" });
  }
}

/**
 * @swagger
 * /{itemId}:
 *   put:
 *     summary: Update an existing item
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the item.
 *                 example: Orange
 *     responses:
 *       200:
 *         description: The updated item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The item ID.
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: The item title.
 *                   example: Orange
 *       400:
 *         description: Bad request.
 */
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

/**
 * @swagger
 * /{itemId}:
 *   delete:
 *     summary: Delete an item by ID
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item to delete.
 *     responses:
 *       200:
 *         description: The deleted item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The item ID.
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: The item title.
 *                   example: Apple
 *       400:
 *         description: Bad request.
 */
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
