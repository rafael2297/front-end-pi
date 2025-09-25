const carroselSlide = document.querySelector(".carrosel-slide");
const carroselItems = document.querySelectorAll(".carrosel-item");

let counter = 0;

// Função para obter largura do slide
function getItemWidth() {
    return carroselItems[0].clientWidth;
}

// Função para mover o carrossel
function moveCarrosel() {
    const size = getItemWidth();
    carroselSlide.style.transform = "translateX(" + -size * counter + "px)";
}

// Removidos event listeners das setas

// Opcional: Ajustar o tamanho do carrossel ao redimensionar a janela
window.addEventListener("resize", () => {
    // Recalcular o tamanho se necessário, ou simplesmente reaplicar a posição
    // const newSize = carouselItems[0].clientWidth;
    // size = newSize;

    moveCarrosel(); // Reaplicar a posição correta
});

// Bolinhas de seleção
const indicadoresContainer = document.querySelector(".carrosel-indicadores");
function criarIndicadores() {
    indicadoresContainer.innerHTML = "";
    carroselItems.forEach((_, idx) => {
        const dot = document.createElement("span");
        dot.classList.add("carrosel-dot");
        if (idx === counter) dot.classList.add("active");
        dot.addEventListener("click", () => {
            counter = idx;
            moveCarrosel();
            updateIndicators();
        });
        indicadoresContainer.appendChild(dot);
    });
}

function updateIndicators() {
    const dots = indicadoresContainer.querySelectorAll(".carrosel-dot");
    dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === counter);
    });
}

criarIndicadores();

// Autoplay

let autoInterval = setInterval(() => {
    counter = (counter + 1) % carroselItems.length;
    moveCarrosel();
    updateIndicators();
}, 8000);

// Pausar autoplay ao interagir nas bolinhas
indicadoresContainer.addEventListener("mouseenter", () =>
    clearInterval(autoInterval)
);
indicadoresContainer.addEventListener("mouseleave", () => {
    autoInterval = setInterval(() => {
        counter = (counter + 1) % carroselItems.length;
        moveCarrosel();
        updateIndicators();
    }, 8000);
});

//barra de navegação
fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("navbar-container").innerHTML = data;
        // Popover de configuração: inicializar após inserir o HTML
        const btnConfig = document.getElementById("configuracao-btn");
        const popoverConfig = document.getElementById("popover-configuracao");
        const fecharPopover = document.getElementById("fechar-popover-config");
        if (btnConfig && popoverConfig && fecharPopover) {
            btnConfig.addEventListener("click", function (e) {
                e.preventDefault();
                // Posição abaixo do botão
                const rect = btnConfig.getBoundingClientRect();
                popoverConfig.style.display = "block";
                let top = rect.bottom + window.scrollY + 8;
                let left = rect.left + window.scrollX;
                // Ajuste para não sair da tela
                const popoverWidth = popoverConfig.offsetWidth || 240;
                const popoverHeight = popoverConfig.offsetHeight || 120;
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                if (left + popoverWidth > viewportWidth) {
                    left = viewportWidth - popoverWidth - 16;
                }
                if (top + popoverHeight > viewportHeight) {
                    top = rect.top + window.scrollY - popoverHeight - 8;
                }
                popoverConfig.style.top = top + "px";
                popoverConfig.style.left = left + "px";
            });
            fecharPopover.addEventListener("click", function () {
                popoverConfig.style.display = "none";
            });
            // Fechar ao clicar fora do popover
            document.addEventListener("mousedown", function (e) {
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
        // Inicializar popover de notificações
        const btnNotificacao = document.getElementById("notificacao-btn");
        const popoverNotificacao = document.getElementById("popover-notificacao");
        const fecharPopoverNotificacao = document.getElementById(
            "fechar-popover-notificacao"
        );
        if (btnNotificacao && popoverNotificacao && fecharPopoverNotificacao) {
            // Notificações dinâmicas
            let notificacoes = [
                "Seu objetivo está próximo de ser atingido!",
                "Você tem uma nova mensagem do suporte.",
            ];
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
                // Preencher lista dinâmica
                const ul = document.getElementById("notificacao-lista");
                ul.innerHTML = "";
                if (notificacoes.length === 0) {
                    const li = document.createElement("li");
                    li.textContent = "Nenhuma nova notificação.";
                    li.style.marginBottom = "8px";
                    li.style.color = "#222";
                    ul.appendChild(li);
                } else {
                    notificacoes.forEach((msg) => {
                        const li = document.createElement("li");
                        li.textContent = msg;
                        li.style.marginBottom = "8px";
                        li.style.color = "#222";
                        ul.appendChild(li);
                    });
                }
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
    });
