let loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (event) => {
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
  await res.json();

  if (!res.ok) {
    if (res.status == 400) {
      Swal.fire({});
    }
  } else {
    window.location = "../cutscenes/cutscenes.html";
  }
});
