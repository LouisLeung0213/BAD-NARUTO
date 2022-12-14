// let signUpBtn = document.querySelector("#signUpSubmit");
let userAccount = document.querySelector("[name=username]");
let userNickname = document.querySelector("[name=nickname]");
let userPassword = document.querySelector("[name=password]");
let userEmail = document.querySelector("[name=email]");
let signUpForm = document.querySelector("#signUpForm");
let backBtn = document.querySelector(".backBtn");

signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let form = event.target;
  //   console.log(form);
  let userInformation = {
    //   username,
    //   nickname,
    //   password,
    //   email,
  };
  for (let userInfo of form) {
    // console.log(userInfo.value);
    if (userInfo.id == "signUpUsername") {
      userInformation.username = userInfo.value;
    }
    if (userInfo.id == "signUpNickname") {
      userInformation.nickname = userInfo.value;
    }
    if (userInfo.id == "signUpPassword") {
      userInformation.password = userInfo.value;
    }
    if (userInfo.id == "email") {
      userInformation.email = userInfo.value;
    }
    if (userInfo.id == "rePassword") {
      userInformation.rePassword = userInfo.value;
    }
  }
  let res = await fetch("/signup", {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(userInformation),
  });
  let json = await res.json();

  // console.log(json);

  if (!res.ok) {
    Swal.fire({
      icon: "error",
      title: "真不幸",
      text: "此大名已被使用",
    });
  } else {
    Swal.fire({
      icon: "success",
      title: `歡迎加入，${userInformation.nickname}`,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) window.location = "../demo_page/demo.html";
    });
  }
});

backBtn.addEventListener("click", () => {
  window.location = "../login/login.html";
});
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

let a = 123;
