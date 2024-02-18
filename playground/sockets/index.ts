import { Server, Socket } from "socket.io";

export default function (io: Server) {
  let userCount = 0;

  io.on("connection", (socket: Socket) => {
    let username = userCount === 0 ? "玩家一" : "玩家二";
    console.log(username);
    userCount += 1;
    socket.broadcast.emit("assign username", username);

    // console.log(socket);
    socket.on("send message", (data) => {
      // console.log(data);
      socket.broadcast.emit("new message sent", data);
    });

    console.log("socket connected 123", socket.id);
    socket.on("join room", (room) => {
      socket.join(room);
    });

    socket.on("disconnect", (reason) => {
      console.log("socket disconnected");
      io.emit("user disconnected", socket.id);
    });
  });
}
