document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar-container");
  if (!placeholder) return;

  fetch("navbar.html")
    .then((res) => res.text())
    .then((html) => {
      placeholder.innerHTML = html;
      // === NOTIFICAÇÕES ===
      let notificacoes = [];
      // Carregar notificações do localStorage
      const novasNotificacoes = [
        "Seu objetivo foi atualizado.",
        "Nova sugestão de economia disponível.",
        "Você tem pode gerar seus relatorios, não se esqueça!",
        "Lembre-se de atualizar seu objetivo.",
        "duvidas acesse o manual na area de configurações."
      ];
      if (localStorage.getItem("notificacoes")) {
        try {
          notificacoes = JSON.parse(localStorage.getItem("notificacoes"));
          // Adiciona novas notificações se não existirem
          novasNotificacoes.forEach(msg => {
            if (!notificacoes.includes(msg)) {
              notificacoes.push(msg);
            }
          });
          localStorage.setItem("notificacoes", JSON.stringify(notificacoes));
        } catch (e) {
          notificacoes = [...novasNotificacoes];
          localStorage.setItem("notificacoes", JSON.stringify(notificacoes));
        }
      } else {
        notificacoes = [...novasNotificacoes];
        localStorage.setItem("notificacoes", JSON.stringify(notificacoes));
      }
      const notificacaoBadge = document.getElementById("notificacao-badge");
      const notificacaoLista = document.getElementById("notificacao-lista");

      if (notificacaoLista) {
        function renderNotificacoes() {
          notificacaoLista.innerHTML = notificacoes.map((n, i) => `
            <li id="notificacao-${i}" style="background:#e6f4ea; color:#222; margin-bottom:8px; padding:10px 12px; border-radius:8px; display:flex; align-items:center; justify-content:space-between; box-shadow:0 1px 4px rgba(0,0,0,0.07);">
              <span>${n}</span>
              <button style="background:#e53935; color:#fff; border:none; border-radius:6px; padding:4px 10px; cursor:pointer; font-size:0.95em; margin-left:12px;" onclick="window.excluirNotificacao(${i})">Excluir</button>
            </li>
          `).join("");
          if (notificacaoBadge) {
            if (notificacoes.length > 0) {
              notificacaoBadge.textContent = notificacoes.length;
              notificacaoBadge.style.display = "inline-block";
            } else {
              notificacaoBadge.style.display = "none";
            }
          }
          // Salvar notificações no localStorage
          localStorage.setItem("notificacoes", JSON.stringify(notificacoes));
        }
        window.excluirNotificacao = function(idx) {
          notificacoes.splice(idx, 1);
          renderNotificacoes();
        };
        renderNotificacoes();
      }
      if (notificacaoBadge) {
        if (notificacoes.length > 0) {
          notificacaoBadge.textContent = notificacoes.length;
          notificacaoBadge.style.display = "inline-block";
        } else {
          notificacaoBadge.style.display = "none";
        }
      }

      // === POPOVER NOTIFICAÇÃO ===
      const btnNotificacao = document.getElementById("notificacao-btn");
      const popoverNotificacao = document.getElementById("popover-notificacao");
      const fecharPopoverNotificacao = document.getElementById("fechar-popover-notificacao");

      if (btnNotificacao && popoverNotificacao && fecharPopoverNotificacao) {
        btnNotificacao.addEventListener("click", function (e) {
          e.preventDefault();
          const rect = btnNotificacao.getBoundingClientRect();
          popoverNotificacao.style.display = "block";
          let top = rect.bottom + window.scrollY + 8;
          let left = rect.left + window.scrollX;
          const popoverWidth = popoverNotificacao.offsetWidth || 240;
          const popoverHeight = popoverNotificacao.offsetHeight || 120;
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          if (left + popoverWidth > viewportWidth) {
            left = viewportWidth - popoverWidth - 16;
          }
          if (top + popoverHeight > viewportHeight) {
            top = rect.top + window.scrollY - popoverHeight - 8;
          }
          popoverNotificacao.style.top = top + "px";
          popoverNotificacao.style.left = left + "px";
        });

        fecharPopoverNotificacao.addEventListener("click", function () {
          popoverNotificacao.style.display = "none";
        });

        document.addEventListener("mousedown", function (e) {
          if (
            popoverNotificacao.style.display === "block" &&
            !popoverNotificacao.contains(e.target) &&
            e.target !== btnNotificacao &&
            !btnNotificacao.contains(e.target)
          ) {
            popoverNotificacao.style.display = "none";
          }
        });
      }

      // === MENU LATERAL ===
      const hamburguerBtn = document.getElementById("hamburguer-btn");
      const menuLateral = document.getElementById("menu-lateral");
      const fecharMenu = document.getElementById("fechar-menu");
      const overlay = document.getElementById("overlay");

      if (hamburguerBtn && menuLateral && fecharMenu && overlay) {
        hamburguerBtn.addEventListener("click", () => {
          menuLateral.classList.add("ativo");
          overlay.classList.add("ativo");
        });

        fecharMenu.addEventListener("click", () => {
          menuLateral.classList.remove("ativo");
          overlay.classList.remove("ativo");
        });

        overlay.addEventListener("click", () => {
          menuLateral.classList.remove("ativo");
          overlay.classList.remove("ativo");
        });
      }

      // === POPOVER CONFIGURAÇÃO ===
      const btnConfig = document.getElementById("configuracao-btn");
      const popoverConfig = document.getElementById("popover-configuracao");
      const fecharPopover = document.getElementById("fechar-popover-config");

      if (btnConfig && popoverConfig && fecharPopover) {
        btnConfig.addEventListener("click", function (e) {
          e.preventDefault();
          const rect = btnConfig.getBoundingClientRect();
          popoverConfig.style.display = "block";

          let top = rect.bottom + window.scrollY + 8;
          let left = rect.left + window.scrollX;

          const popoverWidth = popoverConfig.offsetWidth || 240;
          const popoverHeight = popoverConfig.offsetHeight || 120;
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          if (left + popoverWidth > viewportWidth)
            left = viewportWidth - popoverWidth - 16;
          if (top + popoverHeight > viewportHeight)
            top = rect.top + window.scrollY - popoverHeight - 8;

          popoverConfig.style.top = top + "px";
          popoverConfig.style.left = left + "px";
        });

        fecharPopover.addEventListener("click", () => {
          popoverConfig.style.display = "none";
        });

        document.addEventListener("mousedown", (e) => {
          if (
            popoverConfig.style.display === "block" &&
            !popoverConfig.contains(e.target) &&
            e.target !== btnConfig &&
            !btnConfig.contains(e.target)
          ) {
            popoverConfig.style.display = "none";
          }
        });
      }
    });
  });
