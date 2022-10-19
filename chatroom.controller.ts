import { Request, Response } from "express";
import { ChatroomService } from "./chatroom.service";
import { RestfulController } from "./restful.controller";
import "./session";

export class ChatroomController extends RestfulController {
  constructor(private chatroomService: ChatroomService) {
    super();
    this.router.get("/getPost", this.getPost);
    this.router.post("/commentPost", this.commentPost);
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

  commentPost = async (req: Request, res: Response) => {
    try {
      if (!req.session.user) {
        throw new Error("Please login first");
      }
      const userId: number = req.session.user?.id;
      const postContent: string = req.body.content;
      let json = await this.chatroomService.commentPost(userId, postContent);
      res.json(json);
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  };
}
