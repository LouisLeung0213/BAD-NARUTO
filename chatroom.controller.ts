import { Request, Response } from "express";
import { ChatroomService } from "./chatroom.service";
import { RestfulController } from "./restful.controller";

export class ChatroomController extends RestfulController {
  constructor(private chatroomService: ChatroomService) {
    super();
    this.router.get("/getPost", this.getPost);
  }

  getPost = async (req: Request, res: Response) => {
    try {
      let json = await this.chatroomService.getPost();
      res.json(json);
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  };
}
