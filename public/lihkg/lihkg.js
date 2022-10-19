let postWall = document.querySelector(".post");
let postForm = document.querySelector("#postForm");

async function getPost() {
  try {
    let res = await fetch("/getPost");
    let json = await res.json();
    // console.log(json);
    for (let post of json) {
      console.log(post);
    }
  } catch (error) {}
}

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const res = await fetch("/commentPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: req.session.user.id,
      content: postForm.postContent.value,
    }),
  });
  await res.json();
});
