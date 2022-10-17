// import { Client } from "pg";
import { Knex } from "knex";
import { HTTPError } from "./error";
import { checkPassword } from "./hash";

export class UserService {
  constructor(private knex: Knex) {}

  async login(username: string, password: string): Promise<{ id: number }> {
    let userPassword = await // this.knex.raw(
    //   "select password_hash from users where username = $1",
    //   [username]
    // );
    this.knex.select("password_hash").from("users").where("username", username);
    let hashedPassword = userPassword[0];
    const check = await checkPassword(password, hashedPassword);
    if (!check) {
      throw new HTTPError(401, "wrong username or password");
    } else {
      let result = await // this.knex.raw(
      //   "select id from users where username = $1 and password_hash = $2",
      //   [username, hashedPassword]
      // );
      this.knex
        .select("id")
        .from("users")
        .whereIn(["username", "password_hash"], [username, hashedPassword]);
      // let row = result.rows[0];
      return result[0];
    }
  }

  async signup(
    username: string,
    hashedPassWord: string,
    email: string,
    nickname: string
  ): Promise<{ id: number }> {
    let result = await this.knex.raw(
      "insert into users (username,password_hash,email,nickname) values ($1,$2,$3,$4) returning id",
      [username, hashedPassWord, email, nickname]
    );
    let row = result.rows[0];
    if (!row) {
      throw new HTTPError(401, "Invalid input");
    }
    return row;
  }
}
