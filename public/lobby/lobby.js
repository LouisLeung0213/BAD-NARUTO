let skillTree = document.querySelector(".skillTreeLogo");
let mission = document.querySelector(".missionLogo");
let training = document.querySelector(".trainingLogo");
let pvp = document.querySelector(".pvpLogo");
let ninjaDia = document.querySelector("#ninjaDia");
let leave = document.querySelector(".leave");
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
