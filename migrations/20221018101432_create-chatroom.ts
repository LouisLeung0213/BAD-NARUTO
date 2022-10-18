import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const hasChatrm = await knex.schema.hasTable("chatroom");

  if (!hasChatrm) {
    let sql = knex.schema.createTable("chatroom", (table) => {
      table.increments("id");
      table.string("post_title", 32).notNullable();
      table.string("post_content").notNullable();
      table.integer("post_user_id").references("users.id");
      table.timestamps(false, true);
    });
    console.log(sql.toSQL());
    await sql;
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("chatroom");
}
