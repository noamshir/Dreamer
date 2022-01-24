const orderService = require("./order.service");
async function getOrders(req, res) {
  try {
    var orders = await orderService.query(req.params);
    res.send(orders);
  } catch (err) {
    logger.error("Failed to get orders", err);
    res.status(500).send({ err: "Failed to get orders" });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const order = await orderService.getById(id);
    res.send(order);
  } catch (err) {
    logger.error("Failed to get order", err);
    res.status(500).send({ err: "Failed to get order" });
  }
}

async function removeOrder(req, res) {
  const orderId = req.params.id;
  try {
    await orderService.remove(orderId);
    res.send("removed order");
  } catch (err) {
    logger.error("Failed to remove order", err);
    res.status(500).send({ err: "Failed to remove order" });
  }
}

async function updateOrder(req, res) {
  const updatedOrder = req.body;
  console.log(updatedOrder)
  try {
    const savedOrder = orderService.update(updatedOrder);
    res.send(savedOrder);
  } catch (err) {
    logger.error("Failed to update order", err);
    res.status(500).send({ err: "Failed to update order" });
  }
}

module.exports = {
  getOrders,
  getById,
  removeOrder,
  updateOrder,
};