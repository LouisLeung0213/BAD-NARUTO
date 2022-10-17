import express from "express";
import { knex } from "./db";
import { sessionMiddleware } from "./session";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(sessionMiddleware);

let userService = new UserService(knex);
let userController = new UserController(userService);

app.use(userController.router);
