// import { Client } from "pg";
import { Knex } from "knex";
import { HTTPError } from "./error";

export class UserService {
  constructor(private knex: Knex) {}

  async login(username: string, password: string): Promise<{ id: number }> {
    let result = await this.knex.raw(
      "select id from users where username = $1 and password = $2",
      [username, password]
    );
    let row = result.rows[0];
    if (!row) {
      throw new HTTPError(401, "wrong username or password");
    }
    return row;
  }

  async signup(
    username: string,
    password: string,
    email: string,
    birthday: number
  ): Promise<{ id: number }> {
    let result = await this.knex.raw(
      "insert into users (username,password,email,birthday) values ($1,$2,$3,$4) returning id"
    );
    let row = result.rows[0];
    if (!row) {
      throw new HTTPError(401, "Invalid input");
    }
    return row;
  }
}
