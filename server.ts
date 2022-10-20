import express from "express";
// import { Server } from "http";
import { knex } from "./db";
import { env } from "./env";
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

app.listen(env.PORT, () => {
  print(env.PORT);
});
