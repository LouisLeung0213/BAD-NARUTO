import { BattlefieldService } from "./battlefield.service";
import { RestfulController } from "./restful.controller";
import { Request, Response } from "express";
import "./session";
import { HTTPError } from "./error";

export class BattlefieldController extends RestfulController {
  constructor(private battlefieldService: BattlefieldService) {
    super();
    this.router.get("/showSkills", this.showSkills);
    this.router.get("/getMission", this.getMission);
    this.router.get("/npcSkills", this.npcSkills);
    this.router.get("/getPlayerModal", this.getPlayer);
    this.router.post("/missionComplete", this.missionComplete);
    this.router.get("/getUserInfo", this.getUserInfo)
  }

  showSkills = async (req: Request, res: Response) => {
    try {
      if (!req.session.user) {
        throw new HTTPError(401, "cannot get user id");
      }
      let id = req.session.user?.id;
      let json = await this.battlefieldService.showSkills(id);
      res.json(json);
    } catch (error) {
      if (error instanceof HTTPError && error.status == 401) {
        res.status(401).json({ message: "cannot get user id" });
      } else {
        console.log(error);
        res.status(500);
        return;
      }
    }
  };

  getMission = async (req: Request, res: Response) => {
    try {
      if (!req.session.user) {
        throw new HTTPError(401, "Please login first");
      }
      if (!req.query.missionId) {
        throw new HTTPError(404, "mission not found");
      }
      let missionID = +req.query.missionId;
      console.log("mission id: ", missionID);
      let json = await this.battlefieldService.getMission(missionID);
      res.json(json);
    } catch (error) {
      if (error instanceof HTTPError && error.status == 401) {
        res.status(401).json({ message: "Please login first" });
      }
      if (error instanceof HTTPError && error.status == 404) {
        res.status(401).json({ message: "mission not found" });
      } else {
        console.log(error);
        res.status(500);
        return;
      }
    }
  };

  npcSkills = async (req: Request, res: Response) => {
    try {
      if (!req.query.missionId) {
        throw new HTTPError(404, "mission not found");
      }
      let missionID = +req.query.missionId;
      let json = await this.battlefieldService.npcSkills(missionID);
      res.json(json);
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  };

  getPlayer = async (req: Request, res: Response) => {
    try {
      if (!req.session.user) {
        throw new HTTPError(401, "Please login first");
      }

      let id = req.session.user?.id;
      let json = await this.battlefieldService.getPlayer(id);
      res.json(json);
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  };

  missionComplete = async (req: Request, res: Response) => {
    try {
      if (!req.session.user) {
        throw new HTTPError(401, "Please login first");
      }
      // if (!req.query.missionId) {
      //   throw new HTTPError(404, "mission not found");
      // }
      let id = req.session.user.id;
      let missionId = req.body.id;
      console.log(missionId);
      let json = await this.battlefieldService.missionComplete(id, missionId);
      res.json(json);
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  };

  getUserInfo = async (req: Request, res: Response) => {
    try {
      if (!req.session.user) {
        res.status(401);
        res.json({ msg: "Please login first" });
      } else {
        let user = req.session.user;
        let userId = user.id;
        let json = await this.battlefieldService.getUserInfo(userId);
        res.json({json, userId});
      }
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  }
}
