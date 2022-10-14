let mudra = {
    '子': '0',
    '丑': '1',
    '寅': '2',
    '卯': '3',
    '辰': '4',
    '巳': '5',
    '午': '6',
    '未': '7',
    '申': '8',
    '酉': '9',
    '戌': 'a',
    '亥': 'b',
    '壬': 'c',
}

let skillList = {
    "千鳥": "丑-卯-申", 
    "通靈之術": "亥-戌-酉-申-未",
    "潛影蛇手": "寅-子-未-子-寅",
    "封印術 屍鬼封盡": "巳-亥-未-卯-戌-子-酉-午-巳",
    "查克拉手術刀": "亥-丑-寅-子-午-申-未",
    "分身之術": "未-巳-寅",
    "手裏劍影分身之術": "丑-戌-辰-子-戌-亥-巳-寅",
    "水遁 水亂波": "辰-丑-卯",
    "水遁 水龍彈": "丑-申-卯-子-亥-酉-丑-午-酉-子-寅-戌-寅-巳-丑-未-巳-亥-未-子-壬-申-酉-辰-酉-丑-午-未-寅-巳-子-申-卯-亥-辰-未-子-丑-申-酉-壬-子-亥-酉",
    "水遁 水陣壁": "寅-巳-寅-巳-寅-巳",
    "水遁 水牢之術": "巳-未-午-卯-未-午-卯",
    "水遁 大瀑布之術": "寅-丑-申-卯-子-亥-酉-丑-午-戌-寅-戌-巳-申-卯",
    "火遁 鳳仙火": "子-寅-戌-丑-卯-寅",
    "火遁 大火球之術": "巳-未-申-亥-午-寅",
    "火遁 大火球之術": "巳-未-申-亥-午-寅",
    "火遁 龍火之術": "巳-辰-卯-寅",
    "火遁 灰積燒": "巳-子-寅",
    "火遁 鳳仙火之術": "子-寅-戌-丑-卯-寅",
    "火遁 火龍炎彈": "未-午-巳-辰-子-丑-寅",
    "土遁 土龍彈": "未-午-辰-寅",
}

let skillPattern = {}
let mudraUsedQty = {}

for (let skillName in skillList) {
    skillList[skillName] = skillList[skillName].split("-").map(word => {
        if (!mudra[word]){
            console.log("Error:", word, "in", skillName, skillList[skillName], "is not a mudra");
            return '/'
        }
        return mudra[word]
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
        }).join("")
}

console.log(skillList);









