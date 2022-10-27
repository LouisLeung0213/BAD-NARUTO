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

let socket = io.connect();

let playerHp = 100;
let enemyHp = 100;

async function getUserInfo() {
  let res = await fetch("/getUserInfo");
  let result = await res.json();
  // console.log(result.json[0].player_1);
  console.log("result: ", result);
  let enemyId;
  if (result.json[0].player_1 == result.userId) {
    currentPosition = "player1";
    enemyId = result.json[0].player_2;
  } else {
    currentPosition = "player2";
    enemyId = result.json[0].player_1;
  }

  return { currentPosition, enemyId };
}

backBtn.addEventListener("click", async () => {
  socket.emit("leaveRoom", { msg: roomId });
  await fetch("/leaveRoom");
  window.location = "../pvp_room/pvp_room.html";
});

let params = new URL(document.location).searchParams;
let roomId = params.get("pvpRoomId");

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

background.style.backgroundImage = `url(../image/finalmissionbg.jpg)`;

async function showSkills() {
  let res = await fetch("/showSkills");
  let userSkills = await res.json();

  console.log("userSkills:", userSkills);
  skill.remove();
  let z = 1;
  for (let userSkill of userSkills) {
    skillList[`skill${z}`].name = userSkill.skill_name;
    console.log(userSkill.skill_image);
    let node = skill.cloneNode(true);
    node.classList.add("type" + userSkill.skill_type);
    let nodeImage = node.querySelector(".equippedSkillImage");
    nodeImage.src = userSkill.skill_image;
    skillContainer.appendChild(node);
    // console.log(image.skill_pattern[1]);
    for (var i = 0; i < userSkill.skill_pattern.length; i++) {
      switch (userSkill.skill_pattern[i]) {
        case "0":
          skillList[`skill${z}`].mudra.push("子");
          break;
        case "1":
          skillList[`skill${z}`].mudra.push("丑");
          break;
        case "2":
          skillList[`skill${z}`].mudra.push("寅");
          break;
        case "3":
          skillList[`skill${z}`].mudra.push("卯");
          break;
        case "4":
          skillList[`skill${z}`].mudra.push("辰");
          break;
        case "5":
          skillList[`skill${z}`].mudra.push("巳");
          break;
        case "6":
          skillList[`skill${z}`].mudra.push("午");
          break;
        case "7":
          skillList[`skill${z}`].mudra.push("未");
          break;
        case "8":
          skillList[`skill${z}`].mudra.push("申");
          break;
        case "9":
          skillList[`skill${z}`].mudra.push("酉");
          break;
        case "a":
          skillList[`skill${z}`].mudra.push("戌");
          break;
        case "b":
          skillList[`skill${z}`].mudra.push("亥");
          break;
        case "c":
          skillList[`skill${z}`].mudra.push("壬");
          break;
      }
    }
    node.addEventListener("click", (event) => {
      console.log(userSkill.skill_name);
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
            console.log("mudraChecklist: ", mudraChecklist);
            console.log(
              "skillPatternArray_for_attack_animation",
              skillPatternArray_for_attack_animation
            );
          }
        }
      }
    });
    z++;
  }
}
///for battle logic

async function battleLogic() {
  // let res = await fetch(`/npcSkills?missionId=${missionId}`);
  // let npc = await res.json();
  // console.log("NPC:", npc);

  player2.style.backgroundImage = `url(../character_image/youngSasuke.png)`;

  // let npcSkill = npc[0].skill_name;
  // let npcDamage = npc[0].skill_damage;
  // let npcHp = npc[0].hp;
  // let npc_skill_pic = npc[0].skill_animation_pic;
  // let npc_id = npc[0].skill_id;
  // //console.log("halo:", npcSkill, npcDamage);

  let userInfo = await getUserInfo();
  let playerRes = await fetch(`/getPlayerModal`);
  let player = await playerRes.json();

  let player_SkillRes = await fetch("/showSkills");
  let player_Skill = await player_SkillRes.json();

  console.log("player 1 data", player);
  console.log("player 1 skills", player_Skill);

  // let playerHp = player[0].hp;
  if (userInfo.currentPosition == "player1") {
    p1Hp.textContent = `HP剩餘: ${playerHp}`;
    p2Hp.textContent = `HP剩餘: ${enemyHp}`;
  } else {
    p1Hp.textContent = `HP剩餘: ${enemyHp}`;
    p2Hp.textContent = `HP剩餘: ${playerHp}`;
  }
  let playerSkill_1 = player_Skill[0];
  let playerSkill_2 = player_Skill[1];
  let playerSkill_3 = player_Skill[2];
  let playerSkill_4 = player_Skill[3];
  let player_skill_damage;

  async function playerAttack() {
    if (playerIsAttack) {
      for (let skill of player_Skill) {
        if (currentSkill == skill.skill_name) {
          player_skill_damage = skill.skill_damage;
        }
      }

      if (enemyHp > 0) {
        enemyHp -= player_skill_damage;

        if (userInfo.currentPosition == "player1") {
          p2Hp.textContent = `HP剩餘: ${enemyHp}`;
        } else {
          p1Hp.textContent = `HP剩餘: ${enemyHp}`;
        }
        let skillMotion = document.createElement("div");

        characterContainer.insertBefore(skillMotion, player2);
        skillMotion.classList.add(`${userInfo.currentPosition}_skillMotion`);
        console.log(`${userInfo.currentPosition}_skillMotion`);
        skillMotion.style.backgroundImage = `url(../skills_image/${currentSkill}.png)`;
        setTimeout(() => {
          // skillMotion.classList.remove(`${userInfo.currentPosition}_skillMotion`)
          skillMotion.remove();
        }, 1000);

        await fetch(
          `/showMotion?enemyId=${userInfo.enemyId}&currentSkill=${currentSkill}`
        );
        await fetch(
          `/updateHp?damage=${player_skill_damage}&enemyId=${userInfo.enemyId}`
        );
        console.log("enermy hp :", enemyHp);

        if (enemyHp <= 0) {
          await fetch(`/leaveRoom`);

          Swal.fire({
            title: "對手已成為你的手下敗將",
            confirmButtonText: "好嘢！ (≧∇≦*)",
          }).then(() => {
            window.location = "../pvp_room/pvp_room.html";
          });

          socket.emit("battleFinished", { msg: roomId });
        }
      }
    }
  }

  let player_attack_loop = setInterval(() => {
    playerAttack();
    playerIsAttack = false;
  }, 100);
}

showSkills();
battleLogic();

///for player 出招
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
  //console.log(mudraChecklist);
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
    //console.log(word);

    if (word.className == mudraChecklist[0] && word.probability > 0.9) {
      mudraChecklist.shift();
      skillPatternArray_for_attack_animation.shift();

      /*  if (mudraChecklist.length > 0) {
          console.log(`The check list is ${mudraChecklist} now`);
        } else {
          console.log(
            `!!!!!!!!!!!!!!!!!!!!!!忍----術----發----動!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`
          );
        }*/
    }
  });
}

function appendMudraImageDiv(element) {
  skillCommand.textContent = "";
  let imageDiv = document.createElement("div");
  skillCommand.appendChild(imageDiv);
  imageDiv.classList.add("mudraImage");
  //console.log(mudraChecklist[0]);
  if (element) {
    imageDiv.innerHTML = `<img class="imageOfmudra" src="../mudra/${element}-removebg-preview.png"></img>`;
  }
}

socket.emit("joinRoom", { msg: roomId });

socket.on("Hi", (data) => {
  console.log("data.msg: ", data.msg);
});

socket.on("showMotion", async (data) => {
  let userInfo = await getUserInfo();
  let skillMotion = document.createElement("div");
  characterContainer.insertBefore(skillMotion, player2);
  let direction;
  if (userInfo.currentPosition == "player1") {
    direction = "player2_skillMotion";
  } else {
    direction = "player1_skillMotion";
  }
  skillMotion.classList.add(direction);
  skillMotion.style.backgroundImage = `url(../skills_image/${data.msg}.png)`;
  setTimeout(() => {
    skillMotion.remove();
  }, 1000);
});

socket.on("leaveRoomTgt", () => {
  window.location = "../lobby/lobby.html";
});

socket.on("leaveMsg", () => {
  socket.emit("leaveRoom", { msg: roomId });
  Swal.fire({
    icon: "warning",
    title: "對手已臨陣退縮",
    confirmButtonText: "好嘢！ (≧∇≦*)",
  }).then(() => {
    window.location = "../pvp_room/pvp_room.html";
  });
});

socket.on("battleFinishedMsg", () => {
  socket.emit("leaveRoom", { msg: roomId });
  Swal.fire({
    title: "你已經死了！！！",
    confirmButtonText: "納尼？！ ＼(º □ º l|l)/",
  }).then(() => {
    window.location = "../pvp_room/pvp_room.html";
  });
});

socket.on("updateHp", async (data) => {
  let userInfo = await getUserInfo();

  playerHp -= data.msg;
  if (userInfo.currentPosition == "player1") {
    p1Hp.textContent = `HP剩餘: ${playerHp}`;
  } else {
    p2Hp.textContent = `HP剩餘: ${playerHp}`;
  }
});
