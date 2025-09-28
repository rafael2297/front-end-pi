document.addEventListener("DOMContentLoaded", () => {
  // --- CARREGAR DADOS DO USUÁRIO LOGADO ---
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Se não houver usuário logado, redireciona para a página de login para evitar erros.
  if (!loggedInUser) {
    window.location.href = "login.html";
    return;
  }

  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;
      // O restante do seu código da navbar pode ser colocado aqui se necessário
    });

  // --- LÓGICA PARA EDITAR NOME ---
  const nomeSpan = document.getElementById("perfil-nome");
  const editarNomeBtn = document.getElementById("editar-nome-btn");
  const nomeInput = document.getElementById("nome-input");
  const salvarNomeBtn = document.getElementById("salvar-nome-btn");

  // Carrega o nome do usuário logado ao abrir a página
  if (nomeSpan) {
    nomeSpan.textContent = loggedInUser.nome;
  }

  if (editarNomeBtn && nomeSpan && nomeInput && salvarNomeBtn) {
    editarNomeBtn.addEventListener("click", function () {
      nomeInput.value = nomeSpan.textContent;
      nomeSpan.style.display = "none";
      editarNomeBtn.style.display = "none";
      nomeInput.style.display = "inline-block";
      salvarNomeBtn.style.display = "inline-block";
      nomeInput.focus();
    });

    salvarNomeBtn.addEventListener("click", function () {
      const novoNome = nomeInput.value.trim();
      if (novoNome) {
        nomeSpan.textContent = novoNome;

        // 1. Atualiza o nome no objeto do usuário logado na sessão atual
        loggedInUser.nome = novoNome;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        // 2. Atualiza o nome na lista principal de usuários para persistência
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex(user => user.id === loggedInUser.id);
        if (userIndex !== -1) {
          users[userIndex].nome = novoNome;
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
      // Restaura a visualização normal
      nomeSpan.style.display = "inline-block";
      editarNomeBtn.style.display = "inline-block";
      nomeInput.style.display = "none";
      salvarNomeBtn.style.display = "none";
    });
  }

  // --- LÓGICA PARA EDITAR OBJETIVO ---
  const objetivoSpan = document.getElementById("perfil-objetivo");
  const editarObjetivoBtn = document.getElementById("editar-objetivo-btn");
  const objetivoInput = document.getElementById("objetivo-input");
  const salvarObjetivoBtn = document.getElementById("salvar-objetivo-btn");

  if (localStorage.getItem("perfilObjetivo")) {
    objetivoSpan.textContent = "R$ " + localStorage.getItem("perfilObjetivo");
  }

  if (editarObjetivoBtn && objetivoSpan && objetivoInput && salvarObjetivoBtn) {
    editarObjetivoBtn.addEventListener("click", function () {
      objetivoInput.value = objetivoSpan.textContent.replace(/[^\d,\.]/g, "");
      objetivoSpan.style.display = "none";
      editarObjetivoBtn.style.display = "none";
      objetivoInput.style.display = "inline-block";
      salvarObjetivoBtn.style.display = "inline-block";
      objetivoInput.focus();
    });
    salvarObjetivoBtn.addEventListener("click", function () {
      if (objetivoInput.value.trim()) {
        objetivoSpan.textContent = "R$ " + objetivoInput.value.trim();
        localStorage.setItem("perfilObjetivo", objetivoInput.value.trim());
      }
      objetivoSpan.style.display = "inline-block";
      editarObjetivoBtn.style.display = "inline-block";
      objetivoInput.style.display = "none";
      salvarObjetivoBtn.style.display = "none";
    });
  }

  // --- LÓGICA PARA EDITAR VALOR GUARDADO ---
  const guardadoSpan = document.getElementById("perfil-guardado");
  const editarGuardadoBtn = document.getElementById("editar-guardado-btn");
  const guardadoInput = document.getElementById("guardado-input");
  const salvarGuardadoBtn = document.getElementById("salvar-guardado-btn");

  if (localStorage.getItem("perfilGuardado")) {
    guardadoSpan.textContent = "R$ " + localStorage.getItem("perfilGuardado");
  }

  if (editarGuardadoBtn && guardadoSpan && guardadoInput && salvarGuardadoBtn) {
    editarGuardadoBtn.addEventListener("click", function () {
      guardadoInput.value = guardadoSpan.textContent.replace(/[^\d,\.]/g, "");
      guardadoSpan.style.display = "none";
      editarGuardadoBtn.style.display = "none";
      guardadoInput.style.display = "inline-block";
      salvarGuardadoBtn.style.display = "inline-block";
      guardadoInput.focus();
    });
    salvarGuardadoBtn.addEventListener("click", function () {
      if (guardadoInput.value.trim()) {
        guardadoSpan.textContent = "R$ " + guardadoInput.value.trim();
        localStorage.setItem("perfilGuardado", guardadoInput.value.trim());
      }
      guardadoSpan.style.display = "inline-block";
      editarGuardadoBtn.style.display = "inline-block";
      guardadoInput.style.display = "none";
      salvarGuardadoBtn.style.display = "none";
    });
  }
});