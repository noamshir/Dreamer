const express = require('express');
const { getOrders, getById, removeOrder, updateOrder } = require('./order.controller');
const router = express.Router()

router.get("/", getOrders)
router.get("/:id", getById);
router.delete("/:id", removeOrder)
router.put("/:id", updateOrder)

module.exports = router;