import { Request, Response } from "express";
import { HTTPError } from "./error";
import { RestfulController } from "./restful.controller";
import { characterService } from "./character.service";

export class SkillsController extends RestfulController {
  constructor(private characterService: characterService) {
    super();
    this.router.post("/setSkills", this.settingSkills);
  }

  settingSkills = async (req: Request, res: Response) => {
    try {
      let;
    } catch (error) {}
  };
}
