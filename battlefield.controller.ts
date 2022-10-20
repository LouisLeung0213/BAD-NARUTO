import { BattlefieldService } from "./battlefield.service";
import { RestfulController } from "./restful.controller";
import { Request, Response } from "express";
import "./session";
import { HTTPError } from "./error";

export class BattlefieldController extends RestfulController {
  constructor(private battlefieldService: BattlefieldService) {
    super();
    this.router.get("/showSkills", this.showSkills);
  }

  showSkills = async (req: Request, res: Response) => {
    try {
      if (!req.session.user) {
        throw new HTTPError(401, "cannot get character id");
      }
      let id = req.session.user?.id;
      let json = await this.battlefieldService.showSkills(id);
      res.json(json);
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({ message: "unexpected error occurred" });
      return;
    }
  };
}
