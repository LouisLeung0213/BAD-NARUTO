let postWall = document.querySelector(".post");
let postForm = document.querySelector("#postForm");
let postWallContainer = document.querySelector(".postWall");
let returnBtn = document.querySelector(".back");

async function getPost() {
  let res = await fetch("/getPost");
  let json = await res.json();
  // console.log(json);
  console.log(json);
  for (let post of json.json) {
    console.log(post);
    let node = postWall.cloneNode(true);
    let nodeNick = node.querySelector(".postNickname");
    let nodeId = node.querySelector(".postId");
    let nodeContent = node.querySelector(".postValue");
    let nodeTime = node.querySelector(".postTime");
    nodeNick.textContent = post.nickname;
    nodeId.textContent = post.post_user_id;
    nodeContent.textContent = post.post_content;
    nodeTime.textContent = moment(post.created_at).format(
      "MMMM Do YYYY, h:mm:ss a"
    );
    postWallContainer.appendChild(node);
  }
}

getPost();

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const res = await fetch("/commentPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: postForm.postContent.value,
    }),
  });
  await res.json();
  if (!res.ok) {
    if (res.status == 401) {
      Swal.fire({
        icon: "error",
        title: "不接納",
        text: "請先登入",
      });
    }
    if (res.status == 404) {
      Swal.fire({
        icon: "error",
        title: "不接納",
        text: "內容不能空白",
      });
    }
  } else {
    Swal.fire({
      icon: "success",
      title: `偉論已發表`,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) window.location.reload();
    });
  }
});

returnBtn.addEventListener("click", () => {
  window.location = "../lobby/lobby.html";
});
