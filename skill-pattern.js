let earthlyBranches = "子丑寅卯辰巳午未申酉戌亥"

let mudra = {}

for (let i = 0; i < earthlyBranches.length; i++) {
    mudra[i] =  earthlyBranches[i]
};

let skillList = {
    "千鳥": "丑-卯-申", 
    "通靈之術": "亥-戌-酉-申-未",
    "火遁 鳳仙火": "子-寅-戌-丑-卯-寅",
    "封印術 屍鬼封盡": "巳-亥-未-卯-戌-子-酉-午-巳",
    "火遁 大火球之術": "巳-未-申-亥-午-寅",
    "潛影蛇手": "寅-子-未-子-寅",
    "土遁 土龍彈": "未-午-辰-寅",
    "火遁 火龍炎彈": "未-午-巳-辰-子-丑-寅",
}

let skillPattern = {}
let mudraUsedQty = {}

for (let key in skillList) {
    skillList[key] = skillList[key].split("-").map(word => {
        for (let key in mudra){
            if (word === mudra[key]){
                if (!mudraUsedQty[key]){
                    mudraUsedQty[key] = 1
                } else {
                    mudraUsedQty[key]++
                }
                return key
            }
        }
        }).join("")
}
console.log(mudra);
console.log(skillList);
console.log(mudraUsedQty);






