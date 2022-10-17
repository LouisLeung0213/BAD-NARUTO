import express from "express";
// import { Server } from "http";
import { knex } from "./db";
import { env } from "./env";
import { sessionMiddleware } from "./session";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { print } from "listening-on";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());
app.use(sessionMiddleware);

let userService = new UserService(knex);
let userController = new UserController(userService);

app.use(userController.router);

app.listen(env.PORT, () => {
  print(env.PORT);
});
