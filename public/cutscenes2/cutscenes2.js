let textDiv = document.querySelector("#textContainer");
let content = document.querySelector("#text");
let photo = document.querySelector("#cuteNaruto");

let textScript = [
  "為什麼要拉走我",
  "你是誰?",
  "他是新加入木葉的忍者",
  "佐助，跟我們走吧，回去木之葉再說",
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
  if (scriptIndex <= 1) {
    photo.src = "/public/image/uchiha-sasuke-png-hd-removebg-preview.png";
  } else if (scriptIndex >= 2) {
    photo.src = "/public/image/clipart536020-removebg-preview.png";
  }
  scriptIndex++;
}

step();

textDiv.addEventListener("click", () => {
  content.textContent = "";
  step();
});
