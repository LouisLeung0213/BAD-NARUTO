let textDiv = document.querySelector("#textContainer");
let content = document.querySelector("#text");

let textScript = [
  "你好，歡迎加入木之葉忍村",
  "我是漩渦嗚門，請多多指教",
  "我知道你應該急不及待想學習忍術",
  "可是我好朋友佐助去了找他哥哥鼬太知報仇",
  "我現在需要趕去現場阻止他們，你也跟我一起去吧!",
];

// for (let i = 0; i < textScript.length; i++) {
//   console.log(textScript[i]);
// }

let scriptIndex = 0;
let textIndex = 0;

function step() {
  let sentence = textScript[scriptIndex];
  function showNext() {
    content.textContent = sentence.slice(0, textIndex);
    textIndex++;
    if (textIndex > sentence.length) {
      clearInterval(timer);
      textIndex = 0;
    }
  }
  //   showNext();
  let timer = setInterval(showNext, 80);
  //after all script
  if (!sentence) {
    return;
  }
  //   content.textContent = sentence;

  scriptIndex++;
}

step();

textDiv.addEventListener("click", () => {
  content.textContent = "";
  step();
});
