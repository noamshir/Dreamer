const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;
module.exports = {
  query,
  getById,
  remove,
  update
};
async function query({ userId, type }) {
  try {
    const collection = await dbService.getCollection("order");
    const orders = await collection.find({}).toArray();
    return orders;
  } catch (err) {
    logger.error(`erorr while finding orders`, err);
    throw err;
  }
}

async function getById(orderId) {
  try {
    const collection = await dbService.getCollection("order");
    const order = await collection.findOne({ _id: ObjectId(orderId) });
    return order;
  } catch (err) {
    logger.error(`while finding order ${orderId}`, err);
    throw err;
  }
}

async function remove(id) {
  try {
    const collection = await dbService.getCollection("order");
    await collection.deleteOne({ _id: ObjectId(id) });
    return;
  }
  catch (err) {
    logger.error(`cannot remove order ${id}`, err);
    throw err;
  }
}

async function update(updatedOrder) {
  try {
    const collection = await dbService.getCollection("order");
    await collection.updateOne({ _id: updatedOrder._id }, { $set: updatedOrder });
    return updatedOrder;
  } catch (err) {
    logger.error(`cannot update order ${updatedOrder._id}`, err);
    throw err;
  }
}
