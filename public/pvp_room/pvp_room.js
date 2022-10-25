let container = document.querySelector(".container");
let room_template = document.querySelector(".room");
room_template.remove();

// Show room

async function showRooms() {
  let res = await fetch("/getRooms");
  // console.log(res.json().msg);
  if (!res.ok) {
    if (res.status == 401) {
      window.location = "../login/login.html";
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
      let passwordType = room_clone.querySelector(".passwordType");
      let enterPassword = room_clone.querySelector(".enterPassword")
      let enterPasswordForm = room_clone.querySelector(".enterPasswordForm")
      let joinRoomBtn = room_clone.querySelector(".joinRoomBtn")
      roomName.textContent = room.room_name;
      if (room.room_password) {
        passwordType.textContent = "私了場";
      } else {
        passwordType.textContent = "公了場";
        enterPassword.remove()
      }
      playerOne.textContent = room.player_1_name;
      playerTwo.textContent = room.player_2_name;
      container.appendChild(room_clone);

      // Join room

      joinRoomBtn.addEventListener("click", async () => {
        let password = ""
        let needPassword = false
        if (passwordType.textContent = "私了場"){
            password = enterPasswordForm.enterPassword?.value
            needPassword = true
        } 
        let res = await fetch("/joinRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ room_id: room.id, player_1: room.player_1, needPassword, password }),
        });

        let result = await res.json();
        if (result == "wrong password"){
            Swal.fire({
                icon: "error",
                title: "暗號唔啱，你係卧底！？",
                confirmButtonText: "裝傻扮矇",
              });
        } 
        
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
const selectEl = document.querySelector("select");
const confirmBtn = document.querySelector("#confirmBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const createRoomForm = document.querySelector("#createRoomForm");

// if (typeof favDialog.showModal !== "function") {
//   favDialog.hidden = true;
// }

// updateButton.addEventListener("click", () => {
//   if (typeof favDialog.showModal === "function") {
//     favDialog.showModal();
//   } else {
//     outputBox.value =
//       "Sorry, the <dialog> API is not supported by this browser.";
//   }
// });
let url = window.location.href;

createRoomForm.addEventListener("submit", async (e) => {
    e.preventDefault()
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
    if (roomId == "dllm"){
        Swal.fire({
            icon: "error",
            title: "你已經開左房啦",
            confirmButtonText: "sor",
          });
    } else {
        Swal.fire({
          icon: "success",
          title: "正在尋找值得一戰的對手",
          confirmButtonText: "耐心等待",
        });
    }
    // socket.join("roomId:" + roomId[0].id)
  }
});

// cancelBtn.addEventListener("click", () => {
//   favDialog.close();
// });

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

socket.on("enterBattlefield", async (data) => {
    window.location = `../pvp/pvp.html?pvpRoomId=${data.roomId}`;
});

