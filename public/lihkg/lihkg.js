try {
  fetch("/getPost")
    .then((res) => res.json())
    .then((json) => {});
} catch (error) {}
