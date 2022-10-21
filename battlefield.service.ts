import { Knex } from "knex";

export class BattlefieldService {
  constructor(private knex: Knex) {}

  async showSkills(id: number): Promise<Array<object>> {
    console.log("id:", id);
    let result = await this.knex
      .select(
        "character_id",
        "skill_id",
        "skill_image",
        "skill_type",
        "skill_pattern",
        "skill_name",
        "user_id"
      )
      .from("characters_skills_relationships")
      .join("skills", "skill_id", "skills.id")
      .join("characters", "character_id", "characters.id")
      .where("user_id", id);
    console.log("showSkill:", result);
    return result;
  }

  async getMission(missionID: number): Promise<Array<object>> {
    let missionDetail = await this.knex
      .select("*")
      .from("missions")
      .where("id", missionID);
    console.log("missionDetail:", missionDetail);
    return missionDetail[0];
  }
}
