let container = document.querySelector(".container");
let room_template = document.querySelector(".room");
room_template.remove();

// Show room


async function showRooms() {
    let res = await fetch("/getRooms");
    // console.log(res.json().msg);
  if (!res.ok) {
    if (res.status == 401){
        window.location = "../login/login.html"
    }
    return;
  } else {
    container.textContent = "";
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


      // Join room

      room_clone.addEventListener("click", async ()=>{
        let res = await fetch("/joinRoom", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ room_id: room.id, player_1: room.player_1 }),
          });
        //   socket.join("roomId:" + room.id)

        //   let joinRes = await fetch(`/f10?roomId=${room.id}`)
        //   let msg = joinRes.json()
        //   console.log("msg: ", msg);

          res.json({});
      });

    }
  }
}

showRooms();

let socket = io.connect();

socket.on("showRooms", () => {
  showRooms();
});

// Create room

const updateButton = document.getElementById("updateDetails");
const favDialog = document.getElementById("favDialog");
const selectEl = favDialog.querySelector("select");
const confirmBtn = favDialog.querySelector("#confirmBtn");
const cancelBtn = favDialog.querySelector("#cancelBtn");
const createRoomForm = favDialog.querySelector("#createRoomForm");

if (typeof favDialog.showModal !== "function") {
  favDialog.hidden = true;
}

updateButton.addEventListener("click", () => {
  if (typeof favDialog.showModal === "function") {
    favDialog.showModal();
  } else {
    outputBox.value =
      "Sorry, the <dialog> API is not supported by this browser.";
  }
});
let url = window.location.href;

createRoomForm.addEventListener("submit", async () => {
  // 同backend講話想加間房，俾埋detail
  let roomInfo = {
    roomName: createRoomForm.roomNameInput.value,
    roomPassword: createRoomForm.roomPasswordInput.value,
  };
  let res = await fetch("/createRoom", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomInfo),
  });
  let roomId = await res.json();
  if (!res.ok) {
    if (res.status == 400) {
      Swal.fire({
        icon: "error",
        title: "幫間房改番個靚名先啦ching",
        confirmButtonText: "收到sor",
      });
    }
  } else {
    Swal.fire({
      icon: "success",
      title: "okok",
      confirmButtonText: "okok",
    });
    // socket.join("roomId:" + roomId[0].id)
  }
});

cancelBtn.addEventListener("click", () => {
  favDialog.close();
});

// Leave room

let leaveRoomBtn = document.querySelector("#leaveRoom");

leaveRoomBtn.addEventListener("click", async () => {
  let res = await fetch("/leaveRoom");
  if (!res.ok) {
    return;
  } else {
    window.location = "../lobby/lobby.html";
  }
});

// Enter battlefield


socket.on("diu nei la", () => {
    console.log("why diu me???");
  });

  socket.on("enterBattlefield", (data) => {
    window.location = `../battlefield/battlefield.html?pvpRoomId=${data.roomId}`
  });