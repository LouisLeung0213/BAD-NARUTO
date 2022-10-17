let list = document.querySelector("#array");

list.textContent = "123456789123456789";

let mudra = {
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

///////////tensorflowJS///////////////
// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "/tm-my-image-model/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const flip = true; // whether to flip the webcam
  webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // append elements to the DOM
  document.getElementById("webcam-container").appendChild(webcam.canvas);
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

let checklist = [
  "午",
  "子",
  "寅",
  // "卯",
  // "辰",
  // "午",
  "申",
  // "酉",
  // "戌",
  // "戌",
  // "亥",
  // "子",
];
// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
  // console.log(prediction);
  // label1: for (let check = 0; check < checklist.length; check++) {
  //   let targetItem = checklist[check];
  //   //console.log(targetItem);
  //   let maxItem;
  //   let max = 0.8;
  //   label2: for (let i = 0; i < prediction.length; i++) {
  //     if (prediction[i].probability > max) {
  //       maxItem = prediction[i].className;
  //     }
  //     //console.log(maxItem);
  //     if (maxItem == targetItem) {
  //       //console.log("123");
  //       continue label1;
  //     } else {
  //       continue label2;
  //     }
  //   }
  // }
  // console.log(`The check list is ${checklist} now`);
  prediction.map((word) => {
    if (word.className == checklist[0] && word.probability > 0.9) {
      checklist.shift();
      if (checklist.length > 0) {
        console.log(`The check list is ${checklist} now`);
      } else {
        console.log(`水遁_水亂波!`);
      }
    }
  });
  // console.log(predictionResult);
  // if (predictionResult.length > 0) {
  //   console.log("You did the right mudra");
  // }
}

init();
