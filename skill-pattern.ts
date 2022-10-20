let mudra: { [key: string]: string } = {
  子: "0",
  丑: "1",
  寅: "2",
  卯: "3",
  辰: "4",
  巳: "5",
  午: "6",
  未: "7",
  申: "8",
  酉: "9",
  戌: "a",
  亥: "b",
  壬: "c",
};

export let skillList: { [key: string]: { mudra: string; image: string } } = {
  雷遁_千鳥: {
    mudra: "丑-卯-申",
    image: "../skill_name/雷遁千鳥-removebg-preview.png",
  },
  通用_通靈之術: {
    mudra: "亥-戌-酉-申-未",
    image: "../skill_name/通靈之術-removebg-preview.png",
  },
  通用_潛影蛇手: {
    mudra: "寅-子-未-子-寅",
    image: "../skill_name/潛影蛇手-removebg-preview.png",
  },
  通用_封印術屍鬼封盡: {
    mudra: "巳-亥-未-卯-戌-子-酉-午-巳",
    image: "../skill_name/封印術_屍鬼封盡-removebg-preview.png",
  },
  // 通用_查克拉手術刀: {mudra:"亥-丑-寅-子-午-申-未"},
  通用_分身之術: {
    mudra: "未-巳-寅",
    image: "../skill_name/分身-removebg-preview.png",
  },
  通用_手裏劍影分身之術: {
    mudra: "丑-戌-辰-子-戌-亥-巳-寅",
    image: "../skill_name/手劍影分身-removebg-preview.png",
  },
  水遁_水亂波: {
    mudra: "辰-丑-卯",
    image: "../skill_name/水亂波-removebg-preview.png",
  },
  水遁_水龍彈: {
    mudra:
      "丑-申-卯-子-亥-酉-丑-午-酉-子-寅-戌-寅-巳-丑-未-巳-亥-未-子-壬-申-酉-辰-酉-丑-午-未-寅-巳-子-申-卯-亥-辰-未-子-丑-申-酉-壬-子-亥-酉",
    image: "../skill_name/水龍彈-removebg-preview.png",
  },
  水遁_水陣壁: {
    mudra: "寅-巳-寅-巳-寅-巳",
    image: "../skill_name/水陣壁-removebg-preview.png",
  },
  水遁_水牢之術: {
    mudra: "巳-未-午-卯-未-午-卯",
    image: "../skill_name/水牢之術-removebg-preview.png",
  },
  水遁_大瀑布之術: {
    mudra: "寅-丑-申-卯-子-亥-酉-丑-午-戌-寅-戌-巳-申-卯",
    image: "../skill_name/大瀑布術-removebg-preview.png",
  },
  // 火遁_鳳仙火: "子-寅-戌-丑-卯-寅",
  火遁_大火球之術: {
    mudra: "巳-未-申-亥-午-寅",
    image: "../skill_name/豪火球-removebg-preview.png",
  },
  // "火遁 大火球之術": "巳-未-申-亥-午-寅",
  火遁_龍火之術: {
    mudra: "巳-辰-卯-寅",
    image: "../skill_name/龍火之術-removebg-preview.png",
  },
  火遁_灰積燒: {
    mudra: "巳-子-寅",
    image: "../skill_name/灰積燒-removebg-preview.png",
  },
  火遁_鳳仙火: {
    mudra: "子-寅-戌-丑-卯-寅",
    image: "../skill_name/鳳仙火之術-removebg-preview.png",
  },
  火遁_火龍炎彈: {
    mudra: "未-午-巳-辰-子-丑-寅",
    image: "../skill_name/火龍炎彈-removebg-preview.png",
  },
  土遁_土龍彈: {
    mudra: "未-午-辰-寅",
    image: "../skill_name/土遁_土龍彈-removebg-preview.png",
  },
};

let skillPattern = {};
let mudraUsedQty = {};

for (let skillName in skillList) {
  skillList[skillName].mudra = skillList[skillName].mudra
    .split("-")
    .map((word: string) => {
      if (!mudra[word]) {
        console.log(
          "Error:",
          word,
          "in",
          skillName,
          skillList[skillName],
          "is not a mudra"
        );
        return "/";
      }
      return mudra[word];
      // for (let mudraWord in mudra) {
      //   if (word === mudraWord) {
      //     if (!mudraUsedQty[mudra[mudraWord]]) {
      //       mudraUsedQty[mudra[mudraWord]] = 1;
      //     } else {
      //       mudraUsedQty[mudra[mudraWord]]++;
      //     }
      //     return mudra[mudraWord];
      //   }
      //   // console.log(`Error: no such mudra ${word} in ${skillName}`);
      // }
    })
    .join("");
}

for (let skill in skillList) {
  let type_of_skill_array = skill.split("_");
  let type_of_skill = type_of_skill_array[0];
  let name_of_skill = type_of_skill_array[1];
  console.log(name_of_skill);
}

// console.log(skillList);
