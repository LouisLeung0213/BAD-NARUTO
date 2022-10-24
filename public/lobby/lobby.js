let skillTree = document.querySelector(".skillTreeLogo");
let mission = document.querySelector(".missionLogo");
let training = document.querySelector(".trainingLogo");
let pvp = document.querySelector(".pvpLogo");
let ninjaDia = document.querySelector("#ninjaDia");
let leave = document.querySelector(".leave");
let logoutBtn = document.querySelector("#logoutBtn");
let missionBtns = document.querySelectorAll(".missionBtn");

let naruto = document.querySelector("#naruto");
let sasuke = document.querySelector("#sasuke");
let sakura = document.querySelector("#sakura");
let gaara = document.querySelector("#gaara");

//skill tree display

ninjaDia.style.display = "none";

naruto.addEventListener("mouseover", () => {
  skillTree.style.display = "flex";
});

naruto.addEventListener("mouseout", () => {
  skillTree.style.display = "none";
});

//mission display
sasuke.addEventListener("mouseover", () => {
  mission.style.display = "flex";
});

sasuke.addEventListener("mouseout", () => {
  mission.style.display = "none";
});

//training display
sakura.addEventListener("mouseover", () => {
  training.style.display = "flex";
});

sakura.addEventListener("mouseout", () => {
  training.style.display = "none";
});

//pvp display
gaara.addEventListener("mouseover", () => {
  pvp.style.display = "flex";
});

gaara.addEventListener("mouseout", () => {
  pvp.style.display = "none";
});

function toMission() {
  ninjaDia.style.display = "block";
}

function toSkill() {
  window.location = "../training/training.html";
}

function toChat() {
  window.location = "../lihkg/lihkg.html";
}

leave.addEventListener("click", (event) => {
  ninjaDia.style.display = "none";
});

for (let missionBtn of missionBtns) {
  missionBtn.addEventListener("click", async (event) => {
    let missionId = event.path[1].querySelector(".missionId").textContent;
    window.location = `../battlefield/battlefield.html?missionId=${missionId}`;
  });
}

logoutBtn.addEventListener("click", async () => {
  let res = await fetch("/logout");
  let json = await res.json();
  if (res.status == 303){
    window.location = "../login/login.html"
  }
});

gaara.addEventListener("click", () => {
  window.location = "../pvp_room/pvp_room.html"
})

// Socket

let socket = io.connect();

socket.on("connect", () => {
  console.log("connected to server: ", socket.id);
  socket.emit("ping");
  console.log("ping");
  // socket.emit("showRoomList")
});

socket.on("pong", () => {
  console.log("you pong me");
})