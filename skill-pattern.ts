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

export let skillList: { [key: string]: string } = {
  雷遁_千鳥: "丑-卯-申",
  通用_通靈之術: "亥-戌-酉-申-未",
  通用_潛影蛇手: "寅-子-未-子-寅",
  通用_封印術屍鬼封盡: "巳-亥-未-卯-戌-子-酉-午-巳",
  通用_查克拉手術刀: "亥-丑-寅-子-午-申-未",
  通用_分身之術: "未-巳-寅",
  通用_手裏劍影分身之術: "丑-戌-辰-子-戌-亥-巳-寅",
  水遁_水亂波: "辰-丑-卯",
  水遁_水龍彈:
    "丑-申-卯-子-亥-酉-丑-午-酉-子-寅-戌-寅-巳-丑-未-巳-亥-未-子-壬-申-酉-辰-酉-丑-午-未-寅-巳-子-申-卯-亥-辰-未-子-丑-申-酉-壬-子-亥-酉",
  水遁_水陣壁: "寅-巳-寅-巳-寅-巳",
  水遁_水牢之術: "巳-未-午-卯-未-午-卯",
  水遁_大瀑布之術: "寅-丑-申-卯-子-亥-酉-丑-午-戌-寅-戌-巳-申-卯",
  // 火遁_鳳仙火: "子-寅-戌-丑-卯-寅",
  火遁_大火球之術: "巳-未-申-亥-午-寅",
  // "火遁 大火球之術": "巳-未-申-亥-午-寅",
  火遁_龍火之術: "巳-辰-卯-寅",
  火遁_灰積燒: "巳-子-寅",
  火遁_鳳仙火之術: "子-寅-戌-丑-卯-寅",
  火遁_火龍炎彈: "未-午-巳-辰-子-丑-寅",
  土遁_土龍彈: "未-午-辰-寅",
};

let skillPattern = {};
let mudraUsedQty = {};

for (let skillName in skillList) {
  skillList[skillName] = skillList[skillName]
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
      // for (let mudraWord in mudra){
      //     if (word === mudraWord){
      //         if (!mudraUsedQty[mudra[mudraWord]]){
      //             mudraUsedQty[mudra[mudraWord]] = 1
      //         } else {
      //             mudraUsedQty[mudra[mudraWord]]++
      //         }
      //         return mudra[mudraWord]
      //     }
      //     // console.log(`Error: no such mudra ${word} in ${skillName}`);
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
