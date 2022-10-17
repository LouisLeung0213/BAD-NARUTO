// let canvas = document.querySelector("#canvas");

// // let context = canvas.getContext("2d");

// let video = document.querySelector("#video");
// let image;
// let photoCapture = document.querySelector(".capture");

// //123

// let testingCanvas = document.querySelector("#testing");

// let test = testingCanvas.getContext("2d");

// if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//   setInterval(async () => {
//     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//       video.srcObject = stream;
//       video.play();
//     });
//     context.drawImage(video, 0, 0, 200, 200);

//     let imageData = context.getImageData(0, 0, 200, 200);

//     console.log(imageData);
//     //photoCapture.putImageData(imageData, 0, 0);
//     // test.drawImage(imageData, 0, 0, 640, 480);
//     // console.log(imageData);
//     return imageData;
//   }, 2000);
// }

// document.getElementById("snap").addEventListener("click", () => {
//   context.drawImage(video, 0, 0, 200, 200);
// });

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

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
  console.log(prediction);
  return prediction;
}

init();
