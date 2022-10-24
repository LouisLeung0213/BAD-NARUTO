let loginForm = document.querySelector("#loginForm");
let signupBtn = document.querySelector(".signupBtn");

loginForm.addEventListener("submit", async (event) => {
  console.log("hi");
  event.preventDefault();
  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: loginForm.username.value,
      password: loginForm.password.value,
    }),
  });
  console.log("res: ", res);
  let userInfo = await res.json();
  console.log(userInfo);

  if (!res.ok) {
    if (res.status == 404) {
      Swal.fire({
        icon: "error",
        title: "噢。。。",
        text: "忍者不存在",
      });
    }
    if (res.status == 401) {
      Swal.fire({
        icon: "error",
        title: "噢。。。",
        text: "用戶或密碼錯誤",
      });
    }
  } else {
    Swal.fire({
      icon: "success",
      title: `歡迎回來，${userInfo.nickname}`,
      confirmButtonText: "進入忍村",
      showConfirmButton: true,
    }).then(async (result) => {
      let checkUser = await fetch("/isNewBie");
      let passedMission1 = await checkUser.json();
      console.log("here", passedMission1.json);
      if (passedMission1.json) {
        window.location = "../lobby/lobby.html";
      } else {
        window.location = "../demo_page/demo.html";
      }
    });
  }
});

signupBtn.addEventListener("click", (event) => {
  window.location = "../signUp/signup.html";
});
