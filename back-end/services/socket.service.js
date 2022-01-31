const logger = require("./logger.service");
var gIo = null;
function connectSockets(http, session) {
  gIo = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
  });
  gIo.on("connection", (socket) => {
    socket.on("disconnect", (socket) => {});

    socket.on("join", (room) => {
      socket.join(room);
    });
    socket.on("join isConnected", (id) => {
      socket.join(id);
      socket.userId = id;
      gIo.to(id).emit(id);
    });
    socket.on("leave", (room) => {
      socket.leave(room);
    });
    socket.on("new-review", ({ review, ownerId, notification }) => {
      socket.to(ownerId).emit("add-review", { review, ownerId, notification });
      socket.to(ownerId).emit("add-review-msg", { notification, ownerId });
    });
    socket.on("join-order-channel", (userId) => {
      // if (socket.orderChannel === userId) return;
      // if (socket.orderChannel) {
      //   socket.leave(socket.orderChannel);
      // }
      socket.join(userId);
      socket.orderChannel = userId;
    });
    socket.on("user-connected", (userId) => {
      gIo.to(userId).emit("user-online", userId);
    });
    socket.on("new order", ({ savedOrder, notification }) => {
      socket.to(savedOrder.seller._id).emit("added order", savedOrder);
      socket.to(savedOrder.seller._id).emit("order received", notification);
    });
    socket.on("new status", ({ order, notification }) => {
      socket.to(order.buyer._id).emit("changed status", order);
      socket.to(order.buyer._id).emit("order status", notification);
    });
    socket.on("set-user-socket", (userId) => {
      socket.userId = userId;
      gIo.to(userId).emit("user-online", userId);
    });
    socket.on("user-online", (userId) => {
      socket.userId = userId;
      gIo.to(userId).emit("user-online", userId);
    });
    socket.on("unset-user-socket", (userId) => {
      console.log("noam dissconected", userId);
      delete socket.userId;
      gIo.emit("user-offline", userId);
    });
    socket.on("isUserConnected", async (userId) => {
      const userSocket = await _getUserSocket(userId);
      if (userSocket) gIo.emit("user-connection", userId);
      else {
        gIo.emit("find-user", userId);
      }
    });
  });
}

async function _getUserSocket(userId) {
  const sockets = await _getAllSockets();
  const socket = sockets.find((s) => s.userId == userId);
  return socket;
}
async function _getAllSockets() {
  const sockets = await gIo.fetchSockets();
  return sockets;
}
module.exports = {
  connectSockets,
};
