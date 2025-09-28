document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find((u) => u.email === email)) {
    showToast("Já existe uma conta com esse email!", "error");
    return;
  }

  // Cria um ID único para o novo usuário
  const id = Date.now();

  users.push({ id, nome, email, senha });
  localStorage.setItem("users", JSON.stringify(users));

  showToast("Cadastro realizado com sucesso!", "success");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
});