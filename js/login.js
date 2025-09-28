document.querySelector(".btn.finalizar").addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.querySelector("input[name='email']").value.trim();
  const senha = document.querySelector("input[name='senha']").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((u) => u.email === email && u.senha === senha);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    showToast("Login realizado com sucesso!", "success");

    setTimeout(() => {
      window.location.href = "Home.html";
    }, 2000);
  } else {
    showToast("Email ou senha inválidos!", "error");
  }
});
