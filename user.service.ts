// import { Client } from "pg";

// import { log } from "console";
import { Knex } from "knex";
// import { CLIENT_RENEG_WINDOW } from "tls";
import { HTTPError } from "./error";
import { checkPassword } from "./hash";

export class UserService {
  constructor(private knex: Knex) {}

  async login(
    username: string,
    password: string
  ): Promise<{ id: number } | undefined> {
    let userPassword = await this.knex
      .select("password_hash")
      .from("users")
      .where("username", username);
    if (!userPassword[0]) {
      throw new HTTPError(404, "User does not exist");
    } else {
      let hashedPassword = userPassword[0].password_hash;
      const check = await checkPassword(password, hashedPassword);
      if (!check) {
        throw new HTTPError(401, "wrong username or password");
      } else {
        let result = await this.knex
          .select("id", "nickname")
          .from("users")
          .where("username", username)
          .andWhere("password_hash", hashedPassword);
        // .whereIn(["username", "password_hash"], [username, hashedPassword]);
        // let row = result.rows[0];
        return result[0];
      }
    }
  }

  async signup(
    username: string,
    hashedPassWord: string,
    email: string,
    nickname: string
  ): Promise<{ id: number }> {
    // let id = 1;
    // return { id };
    let checkUser = await this.knex
      .select("username")
      .from("users")
      .where("username", username);
    if (checkUser[0]) {
      throw new HTTPError(401, "username is taken");
    }
    let result = await this.knex("users")
      .insert({
        username,
        password_hash: hashedPassWord,
        email,
        nickname,
      })
      .returning("id");

    if (result) {
      let createCharacter = await this.knex("characters").insert({
        user_id: result[0].id,
        name: nickname,
        level: 1,
        hp: 100,
        exp: 0,
        is_player: true,
      });
      console.log(result[0].id);
    }

    let row = result[0].id;
    console.log(row);
    if (!row) {
      throw new HTTPError(401, "Invalid input");
    }
    return row;
  }

  async isNewBie(userId: number): Promise<{ id: number }> {
    let checkUserCharacterId = await this.knex
      .select("id")
      .from("characters")
      .where("user_id", userId)
      .returning("id");
    console.log(checkUserCharacterId);
    let oldSeafood = await this.knex
      .select("*")
      .from("mission_statuses")
      .where("character_id", checkUserCharacterId[0].id)
      .returning("id");

    return oldSeafood[0];
  }
}
