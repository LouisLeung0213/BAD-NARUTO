import { Client } from "pg";
import { HTTPError } from "./error";

export class UserService {
  constructor(private client: Client) {}

  async login(
    username: string,
    password: string
  ): Promise<{ message: string }> {
    let result = await this.client.query(
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
    password: number,
    email: string,
    birthday: number
  ): Promise<{ id: number }> {
    let result = await this.client.query(
      "insert into users (username,password,email,birthday) values ($1,$2,$3,$4) returning id"
    );
    let row = result.rows[0];
  }
}
