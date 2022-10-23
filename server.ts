import express from "express";
// import { Server } from "http";
import { knex } from "./db";
import { env } from "./env";
import socketIO from "socket.io";
import http from "http";
import { sessionMiddleware } from "./session";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { print } from "listening-on";
import { CharacterService } from "./character.service";
import { CharacterController } from "./character.controller";
import { ChatroomService } from "./chatroom.service";
import { ChatroomController } from "./chatroom.controller";
import { BattlefieldService } from "./battlefield.service";
import { BattlefieldController } from "./battlefield.controller";

const app = express();
let server = http.createServer(app); // alternative: let server = new http.Server(app) <--- OOP call method, 效果等同於直接 call function
export let io = new socketIO.Server(server); // 淨係得OOP版，一定要 new

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware);

let userService = new UserService(knex);
let userController = new UserController(userService);
let characterService = new CharacterService(knex);
let characterController = new CharacterController(characterService);
let chatroomService = new ChatroomService(knex);
let chatroomController = new ChatroomController(chatroomService);
let battlefieldService = new BattlefieldService(knex);
let battlefieldController = new BattlefieldController(battlefieldService);

app.use(userController.router);
app.use(characterController.router);
app.use(chatroomController.router);
app.use(battlefieldController.router);

// 要socket用到session, 加個middleware俾佢
io.use((socket, _next) => {
  let req = socket.request as express.Request;
  let res = req.res!;
  let next = (err: any) => _next(err);
  sessionMiddleware(req, res, next);
});

io.on("connection", (socket) => {
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
    socket.emit("pong")
    console.log("pong");
  });
});

server.listen(env.PORT, () => {
  print(env.PORT);
});
