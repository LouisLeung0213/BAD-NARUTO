import { Knex } from "knex";
import { HTTPError } from "./error";

export class CharacterService {
  constructor(private knex: Knex) {}

  async settingSkills(selectedSkill: string, userId: number) {
    let character_id = await this.knex("characters")
      .select("id")
      .where("user_id", userId);

    let skill_id = await this.knex("skills")
      .select("id")
      .where("skill_name", selectedSkill);

    console.log(skill_id);
    if (character_id && skill_id) {
      let settingSkill = await this.knex(
        "characters_skills_relationships"
      ).insert({
        character_id: character_id[0].id,
        skill_id: skill_id[0].id,
      });
    }
  }
}
