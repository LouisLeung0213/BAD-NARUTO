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

function go() {
  window.location =
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
}
