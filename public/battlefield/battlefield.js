let skillContainer = document.querySelector("#skillContainer");
let skill = document.querySelector(".skill");
const practiceDialog = document.querySelector("#practiceDialog");
const dialogClose = practiceDialog.querySelector("#dialogClose");
const skillCommand = document.querySelector("#skillCommand");
let background = document.querySelector("#background");
let playerImage = document.querySelector(".player2character");
let params = new URL(document.location).searchParams;
missionId = params.get("missionId");
// let missionId;
// background.style.backgroundImage = `url(../image/missionbg2.jpeg)`;

let skillList = {
  skill1: { name: "", mudra: [] },
  skill2: { name: "", mudra: [] },
  skill3: { name: "", mudra: [] },
  skill4: { name: "", mudra: [] },
};

let mudraChecklist = [];

// window.onload = () => {};

async function getMission() {
  let res = await fetch(`/getMission?missionId=${missionId}`);
  let missionDetail = await res.json();

  background.style.backgroundImage = `url(${missionDetail.mission_background})`;
  console.log("missionDetail:", missionDetail);
}

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
      if (typeof practiceDialog.showModal === "function") {
        practiceDialog.style.display = "flex";
      }
      // let count = 0;
      // let stopper = false;
      mudraChecklist = [];
      // while (stopper == false) {
      for (let skill in skillList) {
        console.log(
          "skill.name: ",
          skillList[skill].name,
          "userSkill.skill_name: ",
          userSkill.skill_name
        );
        if (userSkill.skill_name == skillList[skill].name) {
          console.log("THE SAME!!");
          for (let mudra of skillList[skill].mudra) {
            mudraChecklist.push(mudra);
            console.log("mudraChecklist: ", mudraChecklist);
          }
          // mudraChecklist.push(...skillList[`skill${z}`].mudra);
        }
        // count++;
        // if (count == skillList[skills].mudra.length) {
        //   stopper = true;
        // }
      }
      // }
    });
    z++;
  }
}

async function npcModal() {
  console.log("here");
  let res = await fetch(`/npcSkills?missionId=${missionId}`);
  let npc = await res.json();

  console.log("NPC:", npc);

  playerImage.style.backgroundImage = `url(${npc[0].character_image})`;

  // function npcAttack() {
  //   let npcSkill = npc.skill_name;
  //   let npcDamage = npc.skill_damage;
  //   let npcHp = npc.hp;
  //   let skill_animation_pic;
  // }

  // npcAttack();
}

async function playerModal() {
  let res = await fetch(`/getPlayerModal`);
  let player = await res.json();

  console.log("player: ", player);
}

showSkills();
getMission();
playerModal();
npcModal();

console.log(skillList);

dialogClose.addEventListener("click", () => {
  practiceDialog.style.display = "none";
});

// AI
const url = "../tm-my-image-model_v2/";
let model, webcam, maxPredictions;
async function init() {
  const modelURL = url + "model.json";
  const metadataURL = url + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  // Convenience function to setup a webcam
  const flip = true; // whether to flip the webcam
  webcam = new tmImage.Webcam(800, 800, flip); // width, height, flip
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
  if (mudraChecklist.length == 0) {
    appendMudraImageDiv(9889);
  }
  prediction.map((word) => {
    if (word.className == mudraChecklist[0] && word.probability > 0.9) {
      mudraChecklist.shift();

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

  imageDiv.innerHTML = `<img class="imageOfmudra" src="../mudra/${element}-removebg-preview.png"></img>`;
}
