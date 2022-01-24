const logger = require("./logger.service");
var gIo = null;
function connectSockets(http, session) {
  gIo = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
  });
  gIo.on("connection", (socket) => {
    console.log("New socket", socket.id);
    socket.on("disconnect", (socket) => {
      console.log("Someone disconnected");
    });
    socket.on("chat toy", (toyId) => {
      if (socket.myToyId === toyId) return;
      if (socket.myToyId) {
        socket.leave(socket.myToyId);
      }
      socket.join(toyId);
      socket.myToyId = toyId;
    });
    socket.on("chat newMsg", (msg) => {
      console.log("Emitting Chat msg", msg);
      // emits only to sockets in the same room
      gIo.to(socket.myToyId).emit("chat addMsg", msg);
    });
    socket.on("join", (room) => {
      console.log("user joined room", room);
      socket.join(room);
    })
    socket.on("leave", (room) => {
      console.log("user left room", room);
      socket.leave(room);
    })
    socket.on("add-review", ({ review, ownerId }) => {
      socket.to(ownerId).emit('add-review', review)
    });
    socket.on("set-user-socket", (userId) => {
      console.log("user logged in", userId);
      socket.userId = userId;
      socket.to(userId).emit('user-online', true)

    });
    socket.on("unset-user-socket", () => {
      console.log("user logged out");
      socket.to(socket.userId).emit('user-offline', false)
      delete socket.userId;
    });
    // socket.on("new-review", (review) => {
    //   console.log("someone added review", review);
    //   gIo.emit("add-review", review);
    // });
  });
}

// function emitTo({ type, data, label }) {
//   if (label) gIo.to("watching:" + label).emit(type, data);
//   else gIo.emit(type, data);
// }

// async function emitToUser({ type, data, userId }) {
//   logger.debug("Emiting to user socket: " + userId);
//   const socket = await _getUserSocket(userId);
//   if (socket) socket.emit(type, data);
//   else {
//     console.log("User socket not found");
//     _printSockets();
//   }
// }

// async function broadcast({ type, data, room = null, userId }) {
//   console.log("BROADCASTING", JSON.stringify(arguments));
//   const excludedSocket = await _getUserSocket(userId);
//   if (!excludedSocket) {
//     // logger.debug('Shouldnt happen, socket not found')
//     // _printSockets();
//     return;
//   }
//   logger.debug("broadcast to all but user: ", userId);
//   if (room) {
//     excludedSocket.broadcast.to(room).emit(type, data);
//   } else {
//     excludedSocket.broadcast.emit(type, data);
//   }
// }

// async function _getUserSocket(userId) {
//   const sockets = await _getAllSockets();
//   const socket = sockets.find((s) => s.userId == userId);
//   return socket;
// }
// async function _getAllSockets() {
//   // return all Socket instances
//   const sockets = await gIo.fetchSockets();
//   return sockets;
// }

// async function _printSockets() {
//   const sockets = await _getAllSockets();
//   console.log(`Sockets: (count: ${sockets.length}):`);
//   sockets.forEach(_printSocket);
// }
// function _printSocket(socket) {
//   console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`);
// }

// module.exports = {
//   connectSockets,
//   emitTo,
//   emitToUser,
//   broadcast,
// };

module.exports = {
  connectSockets,
};
