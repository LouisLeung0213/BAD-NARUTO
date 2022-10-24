select rooms.id as room_id, room_name, room_password, is_started, player_1, users_1.nickname as player_1_name, player_2, users_2.nickname as player_2_name
 from rooms
 full outer join users as users_1 on users_1.id = player_1 
 full outer join users as users_2 on users_2.id = player_2 
 where rooms.id != null;