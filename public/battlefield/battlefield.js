let skillContainer = document.querySelector("#skillContainer");
let skill = document.querySelector(".skill");
const practiceDialog = document.querySelector("#practiceDialog");
const dialogClose = practiceDialog.querySelector("#dialogClose");
const skillCommand = document.querySelector("#skillCommand");
let background = document.querySelector("#background");
let characterContainer = document.querySelector(".characterContainer");
let backBtn = document.querySelector("#backBtn");
let player1 = document.querySelector(".player1character");
let player2 = document.querySelector(".player2character");
let p1Hp = document.querySelector("#p1Hp");
let p2Hp = document.querySelector("#p2Hp");

backBtn.addEventListener("click", () => {
  window.location = "../lobby/lobby.html";
});

let params = new URL(document.location).searchParams;
missionId = params.get("missionId");

let skillList = {
  skill1: { name: "", mudra: [] },
  skill2: { name: "", mudra: [] },
  skill3: { name: "", mudra: [] },
  skill4: { name: "", mudra: [] },
};

let mudraChecklist = [];
let skillPatternArray_for_attack_animation = ["1"];
// window.onload = () => {};
let currentSkill = "";
let playerIsAttack = false;

async function getMission() {
  let res = await fetch(`/getMission?missionId=${missionId}`);
  let missionDetail = await res.json();

  background.style.backgroundImage = `url(${missionDetail.mission_background})`;
}

async function showSkills() {
  let res = await fetch("/showSkills");
  let userSkills = await res.json();

  skill.remove();
  let z = 1;
  for (let userSkill of userSkills) {
    skillList[`skill${z}`].name = userSkill.skill_name;
    let node = skill.cloneNode(true);
    node.classList.add("type" + userSkill.skill_type);
    let nodeImage = node.querySelector(".equippedSkillImage");
    nodeImage.src = userSkill.skill_image;
    skillContainer.appendChild(node);
    for (var i = 0; i < userSkill.skill_pattern.length; i++) {
      switch (userSkill.skill_pattern[i]) {
        case "0":
          skillList[`skill${z}`].mudra.push("???");
          break;
        case "1":
          skillList[`skill${z}`].mudra.push("???");
          break;
        case "2":
          skillList[`skill${z}`].mudra.push("???");
          break;
        case "3":
          skillList[`skill${z}`].mudra.push("???");
          break;
        case "4":
          skillList[`skill${z}`].mudra.push("???");
          break;
        case "5":
          skillList[`skill${z}`].mudra.push("???");
          break;
        case "6":
          skillList[`skill${z}`].mudra.push("???");
          break;
        case "7":
          skillList[`skill${z}`].mudra.push("???");
          break;
        case "8":
          skillList[`skill${z}`].mudra.push("???");
          break;
        case "9":
          skillList[`skill${z}`].mudra.push("???");
          break;
        case "a":
          skillList[`skill${z}`].mudra.push("???");
          break;
        case "b":
          skillList[`skill${z}`].mudra.push("???");
          break;
        case "c":
          skillList[`skill${z}`].mudra.push("???");
          break;
      }
    }
    node.addEventListener("click", (event) => {
      currentSkill = userSkill.skill_name;
      if (typeof practiceDialog.showModal === "function") {
        practiceDialog.style.display = "flex";
      }

      mudraChecklist = [];
      skillPatternArray_for_attack_animation = [];

      for (let skill in skillList) {
        if (userSkill.skill_name == skillList[skill].name) {
          for (let mudra of skillList[skill].mudra) {
            mudraChecklist.push(mudra);
            skillPatternArray_for_attack_animation.push(mudra);
          }
        }
      }
    });
    z++;
  }
}
///for battle logic

async function battleLogic() {
  let res = await fetch(`/npcSkills?missionId=${missionId}`);
  let npc = await res.json();

  player2.style.backgroundImage = `url(${npc[0].character_image})`;

  let npcSkill = npc[0].skill_name;
  let npcDamage = npc[0].skill_damage;
  let npcHp = npc[0].hp;
  let npc_skill_pic = npc[0].skill_animation_pic;
  let npc_id = npc[0].skill_id;
  p2Hp.textContent = `HP??????: ${npcHp}`;

  let playerRes = await fetch(`/getPlayerModal`);
  let player = await playerRes.json();

  let player_1_SkillRes = await fetch("/showSkills");
  let player_1_Skill = await player_1_SkillRes.json();

  let playerHp = player[0].hp;
  p1Hp.textContent = `HP??????: ${playerHp}`;
  let playerSkill_1 = player_1_Skill[0];
  let playerSkill_2 = player_1_Skill[1];
  let playerSkill_3 = player_1_Skill[2];
  let playerSkill_4 = player_1_Skill[3];
  let player_skill_damage;

  async function playerAttack() {
    if (playerIsAttack) {
      for (let skill of player_1_Skill) {
        if (currentSkill == skill.skill_name) {
          player_skill_damage = skill.skill_damage;
        }
      }
      let skillMotion = document.createElement("div");
      characterContainer.insertBefore(skillMotion, player2);
      skillMotion.classList.add("player1_skillMotion");
      skillMotion.style.backgroundImage = `url(../skills_image/${currentSkill}.png)`;
      setTimeout(() => {
        skillMotion.remove();
      }, 1000);
      playerIsAttack = false;

      if (npcHp > 0) {
        npcHp -= player_skill_damage;
        p2Hp.textContent = `HP??????: ${npcHp}`;
      } else if (npcHp <= 0) {
        let missionDetail = {};
        missionDetail.id = missionId;
        await fetch("/missionComplete", {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(missionDetail),
        });
        Swal.fire("????????????").then(() => {
          window.location = `../battlefield/battlefield.html?missionId=${
            +missionId + 1
          }`;
        });
      }
    }
  }

  function npcAttack(missionId) {
    let skillMotion = document.createElement("div");
    characterContainer.insertBefore(skillMotion, player2);
    skillMotion.classList.add("player2_skillMotion");
    skillMotion.style.backgroundImage = `url(${npc_skill_pic})`;

    setTimeout(() => {
      skillMotion.remove();
    }, 1000);
    if (playerHp > 0) {
      playerHp -= npcDamage;
      p1Hp.textContent = `HP??????: ${playerHp}`;
    } else if (playerHp <= 0) {
      clearInterval(attackLoop);
      Swal.fire({
        title: "????????????????????????",
        // text: "????????????????????????",
        confirmButtonText: "????????????",
      }).then(() => {
        window.location = "../lobby/lobby.html";
      });
    }
  }

  let player_attack_loop_and_check_hp_loop = setInterval(async () => {
    if (npcHp > 0) {
      playerAttack();
    } else if (npcHp <= 0) {
      p2Hp.textContent = `HP??????: 0`;
      clearInterval(player_attack_loop_and_check_hp_loop);
      let missionDetail = {};
      missionDetail.id = missionId;
      await fetch("/missionComplete", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(missionDetail),
      });
      Swal.fire("????????????").then(() => {
        window.location = `../battlefield/battlefield.html?missionId=${
          +missionId + 1
        }`;
      });
    }

    if (playerHp > 0) {
      p1Hp.textContent = `HP??????: ${playerHp}`;
    } else if (playerHp <= 0) {
      p1Hp.textContent = `HP??????: 0`;
      clearInterval(attackLoop);
      clearInterval(player_attack_loop_and_check_hp_loop);
      Swal.fire({
        title: "????????????????????????",
        // text: "????????????????????????",
        confirmButtonText: "???????????? ???(?? ??? ?? l|l)/",
      }).then(() => {
        window.location = "../lobby/lobby.html";
      });
    }
  }, 100);

  let attackLoop = setInterval(() => {
    npcAttack(missionId);
  }, 15000);
}

showSkills();
getMission();
battleLogic();

///for player ??????
dialogClose.addEventListener("click", () => {
  practiceDialog.style.display = "none";
});

////////////////////////////////////////////////////////////////
// AI
const url = "../tm-my-image-model_v3/";
let model, webcam, maxPredictions;
async function init() {
  const modelURL = url + "model.json";
  const metadataURL = url + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  // Convenience function to setup a webcam
  const flip = true; // whether to flip the webcam
  webcam = new tmImage.Webcam(500, 500, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);
  // append elements to the DOM
  document.getElementById("webcam-container").appendChild(webcam.canvas);
}

init();

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
  }
  let len = mudraChecklist.length;
  appendMudraImageDiv(mudraChecklist[0]);
  while (len != mudraChecklist.length && mudraChecklist.length != 0) {
    appendMudraImageDiv(mudraChecklist[0]);
  }
  if (
    mudraChecklist.length == 0 &&
    skillPatternArray_for_attack_animation.length == 0
  ) {
    appendMudraImageDiv(9889);
    practiceDialog.style.display = "none";
    playerIsAttack = true;
    skillPatternArray_for_attack_animation.push("1");
  }
  prediction.map((word) => {


    if (word.className == mudraChecklist[0] && word.probability > 0.9) {
      mudraChecklist.shift();
      skillPatternArray_for_attack_animation.shift();
    }
  });
}

function appendMudraImageDiv(element) {
  skillCommand.textContent = "";
  let imageDiv = document.createElement("div");
  skillCommand.appendChild(imageDiv);
  imageDiv.classList.add("mudraImage");

  if (element){
    imageDiv.innerHTML = `<img class="imageOfmudra" src="../mudra/${element}-removebg-preview.png"></img>`;
  }
}
