// Verifica se o usuário está logado
const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
  // Se não estiver logado, manda para o login
  window.location.href = "login.html";
} else {
  console.log("Usuário logado:", user.email);
}
