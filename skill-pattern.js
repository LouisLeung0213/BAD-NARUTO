let mudra = {
    '0': '子',
    '1': '丑',
    '2': '寅',
    '3': '卯',
    '4': '辰',
    '5': '巳',
    '6': '午',
    '7': '未',
    '8': '申',
    '9': '酉',
    'a': '戌',
    'b': '亥',
    'c': '壬',
}

let skillList = {
    "千鳥": "丑-卯-申", 
    "通靈之術": "亥-戌-酉-申-未",
    "火遁 鳳仙火": "子-寅-戌-丑-卯-寅",
    "封印術 屍鬼封盡": "巳-亥-未-卯-戌-子-酉-午-巳",
    "火遁 大火球之術": "巳-未-申-亥-午-寅",
    "潛影蛇手": "寅-子-未-子-寅",
    "土遁 土龍彈": "未-午-辰-寅",
    "水遁 水亂波": "辰-丑-卯",
    "火遁 龍火之術": "巳-辰-卯-寅",
    "火遁 灰積燒": "巳-子-寅",
    "火遁 鳳仙火之術": "子-寅-戌-丑-卯-寅",
    "火遁 火龍炎彈": "未-午-巳-辰-子-丑-寅",
    "水遁 水龍彈": "丑-申-卯-子-亥-酉-丑-午-酉-子-寅-戌-寅-巳-丑-未-巳-亥-未-子-壬-申-酉-辰-酉-丑-午-未-寅-巳-子-申-卯-亥-辰-未-子-丑-申-酉-壬-子-亥-酉",
}

console.log(skillList);
console.log(skillList["水遁 水龍彈"].split("-").length);
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

console.log(skillList);
console.log(skillList["水遁 水龍彈"].length);








