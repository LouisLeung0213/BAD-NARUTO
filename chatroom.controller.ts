import { Request, Response } from "express";
import { ChatroomService } from "./chatroom.service";
import { HTTPError } from "./error";
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
      res.json({ json });
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  };

  commentPost = async (req: Request, res: Response) => {
    try {
      if (!req.session.user) {
        throw new HTTPError(401, "Please login first");
      }
      if (!req.body.content) {
        throw new HTTPError(404, "Content cannot be empty");
      }
      const userId: number = req.session.user?.id;
      const postContent: string = req.body.content;
      let json = await this.chatroomService.commentPost(userId, postContent);
      res.json({ json });
    } catch (error) {
      if (error instanceof HTTPError && error.status == 401) {
        console.log(error);
        res.status(401).json({ message: "Please login first" });
        return;
      }
      if (error instanceof HTTPError && error.status == 404) {
        console.log(error);
        res.status(404).json({ message: "Content cannot be empty" });
        return;
      } else {
        console.log(error);
        res.status(500);
        return;
      }
    }
  };
}
