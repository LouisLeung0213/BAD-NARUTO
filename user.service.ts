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
      throw new HTTPError(401, "User does not exist");
    } else {
      let hashedPassword = userPassword[0].password_hash;
      const check = await checkPassword(password, hashedPassword);
      if (!check) {
        throw new HTTPError(402, "wrong username or password");
      } else {
        let result = await this.knex
          .select("id")
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
    let result = await this.knex("users")
      .insert({
        username,
        password_hash: hashedPassWord,
        email,
        nickname,
      })
      .returning("id");
    // .raw(
    //   "insert into users (username,password_hash,email,nickname) values ($1,$2,$3,$4) returning id",
    //   [username, hashedPassWord, email, nickname]
    // );
    console.log("hi");

    let row = result[0].id;
    console.log(row);
    if (!row) {
      throw new HTTPError(401, "Invalid input");
    }
    return row;
  }
}
