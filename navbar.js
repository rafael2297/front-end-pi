document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar-container");
  if (!placeholder) return;

  fetch("navbar.html")
    .then((res) => res.text())
    .then((html) => {
      placeholder.innerHTML = html;

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
