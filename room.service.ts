import { Knex } from "knex";
import { HTTPError } from "./error";

export class RoomService {
  constructor(private knex: Knex) {}

  async getRooms() {
    let rooms = await this.knex
      .select(
        "rooms.id",
        "room_name",
        "room_password",
        "is_started",
        "player_1",
        "users_1.nickname as player_1_name",
        "users_2.nickname as player_2_name"
      )
      .from("rooms")
      .fullOuterJoin("users as users_1", "users_1.id", "player_1")
      .fullOuterJoin("users as users_2", "users_2.id", "player_2")
      .whereNot("rooms.id", null)
      .orderBy("rooms.id");

    if (!rooms) {
      throw new HTTPError(404, "Room not found");
    }
    return rooms;
  }

  async createRoom(room_name: string, room_password: string, player_1: number) {
    let checking_hasRoom = await this.knex
      .select("player_1")
      .from("rooms")
      .where("player_1", player_1);

    if (checking_hasRoom.length > 0) {
      let result = "dllm";
      return result;
    }

    let result = await this.knex("rooms")
      .insert({ room_name, room_password, player_1 })
      .returning("id");

    return result;
  }

  async joinRoom(roomId: number, player_2: number, password: string) {
    let checking_full = await this.knex
      .select("player_2")
      .from("rooms")
      .where("rooms.id", roomId);

    let checking_hasRoom = await this.knex
      .select("player_1")
      .from("rooms")
      .where("player_1", player_2);

    if (password || password == "") {
      let checking_password = await this.knex
        .select("room_password")
        .from("rooms")
        .where("rooms.id", roomId);
      if (password != checking_password[0].room_password) {
        let result = "wrong password";
        return result;
      }

      // console.log("password: ", password);

      // console.log("checking_password[0]: ", checking_password[0]);
    }

    if (checking_full[0].player_2 || checking_hasRoom.length > 0) {
      let result = "wtf";
      return result;
    } else {
      let result = await this.knex("rooms")
        .where("id", roomId)
        .update({ player_2 });
      return result;
    }
  }

  async leaveRoom(player: number) {
    let result = await this.knex
    .select("id")
    .from("rooms")
    .where("player_1", player)
    .orWhere("player_2", player)
    .returning("id")

    await this.knex("rooms")
      .where("player_1", player)
      .orWhere("player_2", player)
      .del()
    return result;
  }
}
