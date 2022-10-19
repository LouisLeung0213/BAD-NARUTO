import { Request, Response } from "express";
import { HTTPError } from "./error";
import { RestfulController } from "./restful.controller";
import { CharacterService } from "./character.service";
import "./session";

export class CharacterController extends RestfulController {
  constructor(private characterService: CharacterService) {
    super();
    this.router.post("/setSkills", this.settingSkills);
    this.router.get("/equippedSkills", this.showSkills);
    this.router.post("/removeSkill", this.removeSkill);
  }

  settingSkills = async (req: Request, res: Response) => {
    try {
      let req_Skill = req.body.skill;
      let selectedSkill = req_Skill.split("_")[1];
      console.log(selectedSkill);
      if (!req.session.user) {
        throw new Error("not login yet");
      }
      let userId = req.session.user?.id;
      let json = await this.characterService.settingSkills(
        selectedSkill,
        userId
      );
      res.json({ json });
    } catch (error) {
      console.log(error);
    }
  };

  showSkills = async (req: Request, res: Response) => {
    try {
      let json = await this.characterService.showSkills(req.session.user!.id);
      res.json({ json });
    } catch (error) {
      console.log(error);
    }
  };

  removeSkill = async (req: Request, res: Response) => {
    try {
      let req_Skill = req.body.skill;
      let removeSkill = req_Skill.split("_")[1];

      if (!req.session.user) {
        throw new Error("not login yet");
      }
      let userId = req.session.user?.id;
      let json = await this.characterService.settingSkills(removeSkill, userId);
      res.json({ json });
    } catch (error) {
      console.log(error);
    }
  };
}
