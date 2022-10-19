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

let skill_introduction = document.querySelector("#introduction");
let button = document.querySelector("#buttonDiv");
let confirmBtn = document.querySelector("#confirmBtn");
let practiceBtn = document.querySelector("#practiceBtn");
let mudraList = document.querySelector(".mudraList");
let damage = document.querySelector(".damage");
let mudra = document.querySelector(".mudra");
let mudraContainer = document.querySelector(".mudraContainer");

let mudraList_clone = mudraList.cloneNode(true);
let mudraContainer_clone = mudraContainer.cloneNode(true);
let mudra_clone = mudra.cloneNode(true);
let damage_clone = damage.cloneNode(true);
let selected_skill_clone = selected_skill.cloneNode(true);
let skill_introduction_clone = skill_introduction.cloneNode(false);
let button_clone = button.cloneNode(false);
let confirmBtn_clone = confirmBtn.cloneNode(true);
let practiceBtn_clone = practiceBtn.cloneNode(true);

selected_skill.remove();
skill_introduction.remove();
button.remove();
mudraList.remove();
mudra.remove();
confirmBtn.remove();
practiceBtn.remove();
damage.remove();
mudraContainer.remove();

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
        console.log(skillList[skill]);
        mudra_clone.textContent = skillList[skill];
      }
    }

    panel.appendChild(button_clone);
    button_clone.appendChild(confirmBtn_clone);
    button_clone.appendChild(practiceBtn_clone);
  });
}

confirmBtn_clone.addEventListener("click", async () => {
  const res = await fetch("/setSkills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      skill: panel.firstChild.id,
    }),
  });
  await res.json();
});
