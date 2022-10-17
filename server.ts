import express from "express";
import { sessionMiddleware } from "./session";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(sessionMiddleware);
