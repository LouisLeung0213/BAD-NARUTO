var video = document.getElementById("movie");
videoAutoPlay = video.play();

document.getElementById("movie").addEventListener("click", function () {
  this.classList.toggle("is-playing");
  if (this.classList.contains("is-playing")) {
    this.innerHTML = "Play";
    video.pause();
  } else {
    this.innerHTML = "Pause";
    video.play();
  }
});
