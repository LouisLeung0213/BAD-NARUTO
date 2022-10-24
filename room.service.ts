import { Knex } from "knex";
import { HTTPError } from "./error";

export class RoomService {
  constructor(private knex: Knex) {}

  async getRooms() {
    let rooms = await this.knex
    .select("room_name", "room_password", "is_started", "users_1.username as player_1_name", "users_2.username as player_2_name")
    .from("rooms")
    .join("users as users_1", "users_1.id", "player_1")
    .join("users as users_2", "users_2.id", "player_2")
    if (!rooms){
        throw new HTTPError(404, "Room not found")
    }
    return rooms;
  }
}
