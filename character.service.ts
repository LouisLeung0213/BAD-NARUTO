import { Knex } from "knex";
import { HTTPError } from "./error";

export class characterService {
  constructor(private knex: Knex) {}

  async settingSkills(selectedSkill: string) {
    let setting = await this.knex("skills");
  }
}
