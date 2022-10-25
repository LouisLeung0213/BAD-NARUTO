import { BattlefieldService } from "./battlefield.service";
import { RestfulController } from "./restful.controller";
import { Request, Response } from "express";
import "./session";
import { HTTPError } from "./error";
import { io } from "./server";
import { isThisTypeNode } from "typescript";

export class BattlefieldController extends RestfulController {
  constructor(private battlefieldService: BattlefieldService) {
    super();
    this.router.get("/showSkills", this.showSkills);
    this.router.get("/getMission", this.getMission);
    this.router.get("/npcSkills", this.npcSkills);
    this.router.get("/getPlayerModal", this.getPlayer);
    this.router.post("/missionComplete", this.missionComplete);
    this.router.get("/getUserInfo", this.getUserInfo);
    this.router.get("/showMotion", this.showMotion);
    this.router.get("/updateHp", this.updateHp)
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

  // for PvP

  getUserInfo = async (req: Request, res: Response) => {
    try {
      if (!req.session.user) {
        res.status(401);
        res.json({ msg: "Please login first" });
      } else {
        let user = req.session.user;
        let userId = user.id;
        let json = await this.battlefieldService.getUserInfo(userId);
        res.json({ json, userId });
      }
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  };

  showMotion = async (req: Request, res: Response) => {
    let enemyId = +req.query.enemyId!;
    let currentSkill = req.query.currentSkill

    io.to("user:" + enemyId).emit("showMotion", { msg: currentSkill});

    res.json({})
  };


  updateHp = async (req: Request, res: Response) => {
    let damage = req.query.damage
    let enemyId = req.query.enemyId
    io.to("user:" + enemyId).emit("updateHp", {msg: damage})
    console.log("fetched");
    res.json({})
  }

}
