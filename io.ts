// import { io } from "./server"
// import express from "express";

// io.on("connection", (socket) => {
//     console.log("socket connection established: ", socket.id);
//     let req = socket.request as express.Request;
//     let user = req.session.user;
//     console.log("socket session user: ", user);
  
//     if (!user) {
//       socket.disconnect();
//       return;
//     }
  
//     socket.join("user:" + user.id);
  
//     socket.on("ping", () => {
//       socket.emit("pong")
//       console.log("pong");
//     });
  
//     socket.on("joinRoom", (data) => {
//       socket.join("roomId:" + data.msg);
//       // io.to("roomId:"+data.msg).emit("Hi", {msg: "Hello"})
//     })
  
//     socket.on("leaveRoom", (data) => {
//       socket.leave("roomId:" + data.msg)
//       io.to("roomId:"+data.msg).emit("leaveMsg")
//     })
  
//     socket.on("battleFinished", (data) => {
//       socket.leave("roomId:"+data.msg)
//       io.to("roomId:"+data.msg).emit("battleFinishedMsg")
//     })
  
//     socket.on("disconnect", () => {
//       console.log("socket disconnected: ", socket.id);
//     })
  
//   });
  