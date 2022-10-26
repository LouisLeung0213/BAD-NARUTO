import socketIO from "socket.io";
import express from "express";

export class IOService {
  private io: socketIO.Server;
  private socket: socketIO.Socket | undefined;
  constructor(io_server: socketIO.Server) {
    this.io = io_server;
    this.socket = undefined;

    this.io.on("connection", (socket) => {
      this.socket = socket;
      console.log("socket connection established: ", socket.id);
      let req = socket.request as express.Request;
      let user = req.session.user;
      console.log("socket session user: ", user);

      if (!user) {
        socket.disconnect();
        return;
      }

      socket.join("user:" + user.id);

      socket.on("ping", () => {
        socket.emit("pong");
        console.log("pong");
      });

      socket.on("joinRoom", (data) => {
        socket.join("roomId:" + data.msg);
        // io.to("roomId:"+data.msg).emit("Hi", {msg: "Hello"})
      });

      socket.on("leaveRoom", (data) => {
        socket.leave("roomId:" + data.msg);
        this.io.to("roomId:" + data.msg).emit("leaveMsg");
      });

      socket.on("battleFinished", (data) => {
        socket.leave("roomId:" + data.msg);
        this.io.to("roomId:" + data.msg).emit("battleFinishedMsg");
      });
    });
  }

  addEvent = (key: string, action: () => void) => {
    this.socket?.on(key, action);
  };

  emit = (room: string | undefined, key: string, data: any) => {
    if (!room) {
      this.io.emit(data);
    } else {
      this.io.to(room).emit(key, data);
    }
  };
}
