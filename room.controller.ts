import { Socket } from "dgram";
import { Request, Response } from "express";
import { ChatroomService } from "./chatroom.service";
import { HTTPError } from "./error";
import { RestfulController } from "./restful.controller";
import { RoomService } from "./room.service";
import { io } from "./server";
import "./session";

export class RoomController extends RestfulController {
  constructor(private roomService: RoomService) {
    super();
    this.router.get("/getRooms", this.getRooms);
    this.router.post("/createRoom", this.createRoom);
    this.router.post("/joinRoom", this.joinRoom);
    this.router.get("/leaveRoom", this.leaveRoom);
    this.router.get("/f10", this.f10);
  }

  getRooms = async (req: Request, res: Response) => {
    try {
      if (!req.session.user) {
        res.status(401);
        res.json({ msg: "Please login first" });
        // throw new HTTPError(401, "Please login first");
      }
      let rooms = await this.roomService.getRooms();
      res.json(rooms);
    } catch (error) {
      if (error instanceof HTTPError && error.status == 404) {
        res.status(404);
        res.json({ msg: "Room not found" });
      } else {
        console.log(error);
        res.status(500);
        return;
      }
    }
  };

  createRoom = async (req: Request, res: Response) => {
    try {
      let roomName: string = req.body.roomName;
      let roomPassword: string = req.body.roomPassword;
      if (!req.session.user) {
        throw new HTTPError(401, "Please login first");
      }
      let player_1 = req.session.user.id;
      if (!roomName) {
        throw new HTTPError(400, "Missing room name");
      }
      let result = await this.roomService.createRoom(
        roomName,
        roomPassword,
        player_1
      );

      io.emit("showRooms");
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  };

  joinRoom = async (req: Request, res: Response) => {
    try {
      if (!req.session.user) {
        throw new HTTPError(401, "Please login first");
      }
      let player_1 = req.body.player_1;
      let player_2 = req.session.user.id;
      let roomId = req.body.room_id;
      let needPassword = req.body.needPassword
      let password = ""
      if (needPassword){
          password = req.body.password
      }

      if (player_1 == player_2) {
        throw new HTTPError(401, "what the fk are you doing??");
      } else {
        let result = await this.roomService.joinRoom(roomId, player_2, password);
        if (result != "wtf" && result != "wrong password"){
            io.to("user:" + player_1).emit("enterBattlefield", { roomId });
            io.to("user:" + player_2).emit("enterBattlefield", { roomId });
        }
        io.emit("showRooms");
        res.json(result);
      }
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  };

  leaveRoom = async (req: Request, res: Response) => {
    try {
      if (!req.session.user) {
        throw new HTTPError(401, "Please login first");
      }
      let player = req.session.user.id;
      await this.roomService.leaveRoom(player);
      io.emit("showRooms");
      res.json({});
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  };

  f10 = async (req: Request, res: Response) => {
    res.json({ msg: "ok ar" });

    // let roomId = req.query.roomId
    // io.to('roomId:' + roomId).emit('enterBattlefield')
  };
}
