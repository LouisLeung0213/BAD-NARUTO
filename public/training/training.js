let skillList = {
  雷遁_千鳥: "丑-卯-申",
  通用_通靈之術: "亥-戌-酉-申-未",
  通用_潛影蛇手: "寅-子-未-子-寅",
  通用_封印術屍鬼封盡: "巳-亥-未-卯-戌-子-酉-午-巳",
  通用_分身之術: "未-巳-寅",
  通用_手裏劍影分身之術: "丑-戌-辰-子-戌-亥-巳-寅",
  水遁_水亂波: "辰-丑-卯",
  水遁_水龍彈:
    "丑-申-卯-子-亥-酉-丑-午-酉-子-寅-戌-寅-巳-丑-未-巳-亥-未-子-壬-申-酉-辰-酉-丑-午-未-寅-巳-子-申-卯-亥-辰-未-子-丑-申-酉-壬-子-亥-酉",
  水遁_水陣壁: "寅-巳-寅-巳-寅-巳",
  水遁_水牢之術: "巳-未-午-卯-未-午-卯",
  水遁_大瀑布之術: "寅-丑-申-卯-子-亥-酉-丑-午-戌-寅-戌-巳-申-卯",
  火遁_大火球之術: "巳-未-申-亥-午-寅",
  火遁_龍火之術: "巳-辰-卯-寅",
  火遁_灰積燒: "巳-子-寅",
  火遁_鳳仙火: "子-寅-戌-丑-卯-寅",
  火遁_火龍炎彈: "未-午-巳-辰-子-丑-寅",
  土遁_土龍彈: "未-午-辰-寅",
};
let panel = document.querySelector("#skillPanel");
let skillNames = document.querySelectorAll(".skillName");

let selected_skill = document.querySelector(".selectedSkill");

let mySkills = document.querySelector("#mySkills");
let skillSet = document.querySelector(".skill");

let skill_introduction = document.querySelector("#introduction");
let button = document.querySelector("#buttonDiv");
let confirmBtn = document.querySelector("#confirmBtn");
let practiceBtn = document.querySelector("#practiceBtn");
let backToLobby = document.querySelector("#backLobby");
let mudraList = document.querySelector(".mudraList");

let mudra = document.querySelector(".mudra");
let mudraContainer = document.querySelector(".mudraContainer");

const practiceDialog = document.querySelector("#practiceDialog");
const dialogClose = practiceDialog.querySelector("#dialogClose");
const skillCommand = document.querySelector("#skillCommand");

const camera = document.querySelector("#camera");

let mudraList_clone = mudraList.cloneNode(true);
let mudraContainer_clone = mudraContainer.cloneNode(true);
let mudra_clone = mudra.cloneNode(true);

let selected_skill_clone = selected_skill.cloneNode(true);
let skill_introduction_clone = skill_introduction.cloneNode(false);
let button_clone = button.cloneNode(false);
let confirmBtn_clone = confirmBtn.cloneNode(true);
let practiceBtn_clone = practiceBtn.cloneNode(true);
let backToLobby_clone = backToLobby.cloneNode(true);

let skillSet_clone = skillSet.cloneNode(true);

selected_skill.remove();
skill_introduction.remove();
button.remove();
mudraList.remove();
mudra.remove();
confirmBtn.remove();
practiceBtn.remove();

mudraContainer.remove();
skillSet.remove();

if (typeof practiceDialog.showModal !== "function") {
  practiceDialog.hidden = true;
}

////////For AI
const URL = "../tm-my-image-model_v3/";
let model, webcam, maxPredictions;
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
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

/////end or AI

init();

// async function mudraMatch(mudraChecklist) {
//   console.log(`The check list is ${mudraChecklist} now`);
//   prediction.map((word) => {
//     if (word.className == mudra_list[0] && word.probability > 0.9) {
//       mudra_list.shift();
//       if (mudra_list.length > 0) {
//         console.log(`The check list is ${mudra_list} now`);
//       } else {
//         console.log(`水遁_水亂波!`);
//       }
//     }
//   });
// }
let mudraChecklist = [];
//////
for (let skillName of skillNames) {
  skillName.addEventListener("click", () => {
    //skill name tag
    panel.textContent = "";

    let skillName_clone = skillName.cloneNode(true);
    panel.appendChild(skillName_clone);
    skillName_clone.classList.add("selectedSkill");

    //skill introduction
    panel.appendChild(skill_introduction_clone);
    skill_introduction_clone.appendChild(mudraContainer_clone);
    mudraContainer_clone.appendChild(mudra_clone);
    mudra_clone.textContent = "";
    for (let skill in skillList) {
      if (skillName.id == skill) {
        //console.log(skillList[skill]);
        mudra_clone.textContent = skillList[skill];
        practiceBtn_clone.addEventListener("click", async () => {
          if (typeof practiceDialog.showModal === "function") {
            practiceDialog.style.display = "flex";
          }
          mudraChecklist = [];

          let mudra_list = skillList[skill].split("-");
          console.log(mudra_list);
          mudraChecklist.push(...mudra_list);

          // for (let i = 0; i < mudra_list.length; i++) {
          //   appendMudraImageDiv(mudra_list[i]);
          // }
        });
      }
    }

    panel.appendChild(button_clone);
    button_clone.appendChild(confirmBtn_clone);
    button_clone.appendChild(practiceBtn_clone);
    button_clone.appendChild(backToLobby_clone);
    backToLobby_clone.addEventListener("click", () => {
      window.location = "../lobby/lobby.html";
    });
  });
}

function appendMudraImageDiv(element) {
  skillCommand.textContent = "";
  let imageDiv = document.createElement("div");
  skillCommand.appendChild(imageDiv);
  imageDiv.classList.add("mudraImage");
  //console.log(mudraChecklist[0]);

  if (element){
    imageDiv.innerHTML = `<img class="imageOfmudra" src="../mudra/${element}-removebg-preview.png"></img>`

  } 
}

dialogClose.addEventListener("click", () => {
  practiceDialog.style.display = "none";
});

//show skills that user already equip
async function showEquippedSkill() {
  let res = await fetch("/equippedSkills", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let skillResult = await res.json();
  console.log(skillResult);

  mySkills.textContent = "";
  if (skillResult.json.length != 0) {
    for (let skill of skillResult.json) {
      console.log(skill.skill_name);
      for (let skillName of skillNames) {
        let id_name = skillName.id.split("_")[1];
        if (id_name == skill.skill_name) {
          let skillName_clone = skillName.cloneNode(true);
          mySkills.appendChild(skillName_clone);
          skillName_clone.classList.add("skill");
        }
      }
    }

    //delete skill

    let skills = document.querySelectorAll(".skill");
    console.log(skills);
    for (let skill of skills) {
      console.log(skill.id);
      skill.addEventListener("click", async (event) => {
        let res = await fetch("/removeSkill", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skill: skill.id,
          }),
        });

        let json = await res.json();
        console.log(json);
        showEquippedSkill();
        returnSkillResult();
      });
    }
  }

  return skillResult;
}
async function returnSkillResult() {
  let results = await showEquippedSkill();
  console.log(results.json.length);
  if (results.json.length <= 3) {
    confirmBtn_clone.addEventListener("click", confirm_btn);
  } else {
    confirmBtn_clone.removeEventListener("click", confirm_btn);
  }

  console.log(results);
}
returnSkillResult();

async function confirm_btn() {
  const res = await fetch("/setSkills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      skill: panel.firstChild.id,
    }),
  });

  let json = await res.json();
  console.log(json);
  returnSkillResult();
  showEquippedSkill();
}
