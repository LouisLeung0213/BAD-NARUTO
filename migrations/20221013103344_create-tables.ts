import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const hasUsers = await knex.schema.hasTable("users");
  const hasCharacters = await knex.schema.hasTable("characters");
  const hasMissions = await knex.schema.hasTable("missions");
  const hasMission_statuses = await knex.schema.hasTable("mission_statuses");
  const hasTypes = await knex.schema.hasTable("types");
  const hasCharacters_types_relationships = await knex.schema.hasTable(
    "characters_type_relationships"
  );
  const hasSkills = await knex.schema.hasTable("skills");
  const hasCharacters_skills_relationships = await knex.schema.hasTable(
    "hasCharacters_skills_relationships"
  );

  if (!hasUsers) {
    let sql = knex.schema.createTable("users", (table) => {
      table.increments("id");
      table.string("username", 32).notNullable();
      table.string("password_hash").notNullable();
      table.string("email").notNullable();
      table.string("nickname").notNullable();
    });
    console.log(sql.toSQL());
    await sql;
  }

  if (!hasCharacters) {
    await knex.schema.createTable("characters", (table) => {
      table.increments("id");
      table.integer("user_id").unsigned().references("users.id");
      table.string("name");
      table.integer("level").notNullable();
      table.integer("hp").notNullable();
      table.integer("exp").notNullable().defaultTo(0);
      table.string("character_image");
      table.boolean("is_player").notNullable();
    });
  }

  if (!hasMissions) {
    await knex.schema.createTable("missions", (table) => {
      table.increments("id");
      table.string("mission_name").notNullable();
      table.integer("mission_reward").notNullable();
      table.integer("npc_id").unsigned().references("characters.id");
      table.string("mission_background").notNullable();
    });
  }

  if (!hasMission_statuses) {
    await knex.schema.createTable("mission_statuses", (table) => {
      table.increments("id");
      table.integer("character_id").notNullable().references("characters.id");
      table.integer("mission_id").notNullable().references("missions.id");
    });
  }

  if (!hasTypes) {
    await knex.schema.createTable("types", (table) => {
      table.increments("id");
      table.string("type_name").notNullable();
    });
  }

  if (!hasCharacters_types_relationships) {
    await knex.schema.createTable("characters_type_relationships", (table) => {
      table.increments("id");
      table.integer("character_id").unsigned().references("characters.id");
      table.integer("type_id").unsigned().references("types.id");
    });
  }

  if (!hasSkills) {
    await knex.schema.createTable("skills", (table) => {
      table.increments("id");
      table.integer("skill_type").unsigned().references("types.id");
      table.string("skill_name").notNullable();
      table.integer("skill_damage").notNullable();
      table.string("skill_pattern").notNullable();
      table.string("skill_image").notNullable();
      table.string("skill_animation_pic").notNullable();
    });
  }

  if (!hasCharacters_skills_relationships) {
    await knex.schema.createTable(
      "characters_skills_relationships",
      (table) => {
        table.increments("id");
        table.integer("character_id").unsigned().references("characters.id");
        table.integer("skill_id").unsigned().references("skills.id");
      }
    );
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("characters_skills_relationships");
  await knex.schema.dropTableIfExists("characters_type_relationships");
  await knex.schema.dropTableIfExists("mission_statuses");
  await knex.schema.dropTableIfExists("missions");
  await knex.schema.dropTableIfExists("skills");
  await knex.schema.dropTableIfExists("types");
  await knex.schema.dropTableIfExists("characters");
  await knex.schema.dropTableIfExists("users");
}
