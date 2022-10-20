import { Knex } from "knex";

export class BattlefieldService {
  constructor(private knex: Knex) {}

  async showSkills(id: number): Promise<Array<object>> {
    let result = await this.knex
      .select(
        "character_id",
        "skill_id",
        "skill_image",
        "skill_type",
        "skill_pattern",
        "skill_name"
      )
      .from("characters_skills_relationships")
      .join("skills", "skill_id", "skills.id")
      .where("character_id", id);
    console.log(result);
    return result;
  }
}
