// function getLocalStream() {
//   navigator.mediaDevices
//     .getUserMedia({ video: true, audio: false })
//     .then((stream) => {
//       console.log(stream);
//       window.localStream = stream; // A
//       window.localAudio.srcObject = stream; // B
//       window.localAudio.autoplay = true; // C
//     })
//     .catch((err) => {
//       console.error(`you got an error: ${err}`);
//     });
// }

// getLocalStream();
