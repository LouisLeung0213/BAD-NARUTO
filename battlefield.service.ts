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
        "user_id",
        "is_player",
        "skill_animation_pic",
        "skill_damage"
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

  async npcSkills(missionId: number): Promise<Array<object>> {
    let npc_skills = await this.knex
      .select(
        "missions.id",
        "npc_id",
        "characters.id",
        "hp",
        "exp",
        "is_player",
        "character_image",
        "level",
        "name",
        "skill_id",
        "skill_name",
        "skill_animation_pic",
        "skill_damage"
      )
      .from("missions")
      .join("characters", "characters.id", "npc_id")
      .join("characters_skills_relationships", "characters.id", "character_id")
      .join("skills", "skill_id", "skills.id")
      .where("is_player", false)
      .andWhere("missions.id", missionId);

    return npc_skills;
  }

  async getPlayer(id: number): Promise<Array<object>> {
    let player = await this.knex
      .select("*")
      .from("characters")
      .where("user_id", id);

    return player;
  }

  async missionComplete(
    id: number,
    missionId: number
  ): Promise<{ id: number }> {
    let getCharactersId = await this.knex
      .select("id")
      .from("characters")
      .where("user_id", id)
      .returning("id");

    console.log("characters_id:", getCharactersId[0].id);

    let completeMission = await this.knex("mission_statuses")
      .insert({
        character_id: getCharactersId[0].id,
        mission_id: missionId,
      })
      .returning("id");

    return completeMission[0];
  }

  // for PvP only

  async getUserInfo(userId: number){
    let result = await this.knex
    .select("player_1", "player_2")
    .from("rooms")
    .where("player_1", userId)
    .orWhere("player_2", userId)

    console.log("result: ", result);
    return result
  }

  // async showAttackMotion(){
    
  // }

}
