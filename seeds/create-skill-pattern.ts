import { Knex } from "knex";
import { skillList } from "../skill-pattern";

console.log(skillList);

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  try {
    // Deletes ALL existing entries
    await txn("skills").del();
    await txn("types").del();

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

    for (let skill in skillList) {
      console.log(skill);
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

      await txn
        .insert([
          {
            skill_type: type_id,
            skill_name: name_of_skill,
            skill_damage: 30,
            skill_pattern: skillList[skill].mudra,
            skill_image: skillList[skill].image,
          },
        ])
        .into("skills");
    }

    await txn.commit();
    return;
  } catch (error) {
    await txn.rollback();
    console.log(error as any);
    return;
  }
}
