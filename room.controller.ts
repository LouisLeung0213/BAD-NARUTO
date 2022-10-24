import { Request, Response } from "express";
import { ChatroomService } from "./chatroom.service";
import { HTTPError } from "./error";
import { RestfulController } from "./restful.controller";
import { RoomService } from "./room.service";
import "./session";

export class RoomController extends RestfulController {
  constructor(private roomService: RoomService) {
    super();
    this.router.get("/getRooms", this.getRooms);
  }

  getRooms = async (req: Request, res: Response) => {
    try {
        if (!req.session.user){
            throw new HTTPError(401, "Please login first")
        }
        let rooms = await this.roomService.getRooms()
        res.json(rooms)
    } catch (error) {
        if (error instanceof HTTPError && error.status == 404){
            res.status(404)
            res.json({msg: "Room not found"})
        } else{
        console.log(error);
        res.status(500);
        return
        }
    }
  }

}
