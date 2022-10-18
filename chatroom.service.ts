import { Knex } from "knex";
import { getPositionOfLineAndCharacter } from "typescript";
import { HTTPError } from "./error";

export class ChatroomService {
  constructor(private knex: Knex) {}

  async getPost() {
    // `select post_title, post_content, post_user_id, created_at, nickname from chatroom join users on post_user_id = users.id`;
    let postContent = await this.knex
      .select(
        "post_title",
        "post_content",
        "post_user_id",
        "created_at",
        "nickname"
      )
      .from("chatroom")
      .join("users", "post_user_id", "users.id");
    return postContent[0];
  }
}
