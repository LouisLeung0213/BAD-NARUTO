let container = document.querySelector(".container");
let room_template = document.querySelector(".room");
room_template.remove();

async function showRooms() {
  let res = await fetch("/getRooms");
  if (!res.ok) {
    return;
  } else {
    let rooms = await res.json();
    for (let room of rooms) {
      let room_clone = room_template.cloneNode(true);
      let roomName = room_clone.querySelector(".roomName");
      let playerOne = room_clone.querySelector(".playerOne");
      let playerTwo = room_clone.querySelector(".playerTwo");
      let need_password = room_clone.querySelector(".roomPassword");
      roomName.textContent = room.room_name;
      if (room.room_password) {
        need_password.textContent = "私了場";
      } else {
        need_password.textContent = "公了場";
      }
      playerOne.textContent = room.player_1_name;
      playerTwo.textContent = room.player_2_name;
      container.appendChild(room_clone);
    }
  }
}

showRooms();
