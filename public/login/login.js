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
  await res.json();

  if (!res.ok) {
    if (res.status == 404) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User does not exist",
      });
    }
    if (res.status == 401) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "username or password is incorrect",
      });
    }
  } else {
    Swal.fire({
      icon: "success",
      title: `Welcome back, ninja`,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) window.location = "../cutscenes/cutscenes.html";
    });
  }
});

signupBtn.addEventListener("click", (event) => {
  
  window.location = "../signUp/signup.html";
});
