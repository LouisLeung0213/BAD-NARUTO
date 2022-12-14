import { Knex } from "knex";
import { skillList } from "../skill-pattern";

console.log(skillList);

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  try {
    // Deletes ALL existing entries
    await txn("skills").del();
    await txn("types").del();
    await txn("characters").del();
    // Inserts seed entries

    let types = await txn("types")
      .insert([
        { id: 1, type_name: "雷遁" },
        { id: 2, type_name: "通用" },
        { id: 3, type_name: "水遁" },
        { id: 4, type_name: "火遁" },
        { id: 5, type_name: "土遁" },
      ])
      .returning(["id", "type_name"]);
    console.log(types);
    for (let type of types) {
      console.log(type.type_name);
      console.log(type.id);
    }
    // let skill_damage = undefined;
    let skill_id_array: Array<object> = [];

    for (let skill in skillList) {
      console.log("skill: ", skillList[skill].mudra.length * 5);
      let type_of_skill_array = skill.split("_");
      let type_of_skill = type_of_skill_array[0];
      let name_of_skill = type_of_skill_array[1];
      let type_id;
      for (let type of types) {
        console.log(type);
        if (type_of_skill == type.type_name) {
          type_id = type.id;
        }
      }

      console.log(type_id);

      let skill_id = await txn
        .insert([
          {
            skill_type: type_id,
            skill_name: name_of_skill,
            skill_damage: skillList[skill].mudra.length * 5,
            skill_pattern: skillList[skill].mudra,
            skill_image: skillList[skill].image,
            skill_animation_pic: `../skills_image/${name_of_skill}.png`,
          },
        ])
        .into("skills")
        .returning("id");

      skill_id_array.push(skill_id[0].id);
    }

    let character = await txn("characters")
      .insert([
        {
          name: "kidSasuke",
          level: 1,
          hp: 100,
          exp: 0,
          is_player: false,
          character_image: "../character_image/youngSasuke.png",
        },
        {
          name: "orochimaru",
          level: 2,
          hp: 150,
          exp: 0,
          is_player: false,
          character_image: "../character_image/snake3.png",
        },
        {
          name: "pain",
          level: 3,
          hp: 200,
          exp: 0,
          is_player: false,
          character_image: "../character_image/pain.png",
        },
        {
          name: "Madara",
          level: 4,
          hp: 300,
          exp: 0,
          is_player: false,
          character_image: "../character_image/ben.png",
        },
        {
          name: "adultSasuke",
          level: 5,
          hp: 400,
          exp: 0,
          is_player: false,
          character_image: "../character_image/bossSasuke.png",
        },
      ])
      .returning(["id"]);
    console.log(character[0].id);

    let mission = await txn("missions")
      .insert([
        {
          mission_name: "佐助的去向",
          mission_reward: 100,
          npc_id: character[0].id,
          mission_background: "../image/start-game.jpg",
        },
        {
          mission_name: "木葉大危機",
          mission_reward: 100,
          npc_id: character[1].id,
          mission_background: "../image/mission2bg.jpeg",
        },
        {
          mission_name: "神羅天征",
          mission_reward: 100,
          npc_id: character[2].id,
          mission_background: "../image/mission3bg.jpeg",
        },
        {
          mission_name: "無限月讀",
          mission_reward: 100,
          npc_id: character[3].id,
          mission_background: "../image/mission4bg.jpeg",
        },
        {
          mission_name: "火影爭奪戰",
          mission_reward: 999,
          npc_id: character[4].id,
          mission_background: "../image/finalmissionbg.jpg",
        },
      ])
      .returning(["id"]);
    // console.log(mission);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!", skill_id_array[1]);

    let npc_skills = await txn("characters_skills_relationships").insert([
      { character_id: character[0].id, skill_id: skill_id_array[11] },
      { character_id: character[1].id, skill_id: skill_id_array[1] },
      { character_id: character[2].id, skill_id: skill_id_array[3] },
      { character_id: character[3].id, skill_id: skill_id_array[15] },
      { character_id: character[4].id, skill_id: skill_id_array[0] },
    ]);

    await txn.commit();
    return;
  } catch (error) {
    await txn.rollback();
    console.log(error as any);
    return;
  }
}
