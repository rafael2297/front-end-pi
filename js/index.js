window.addEventListener('DOMContentLoaded', function () {
    const btnConfig = document.getElementById('configuracao-btn');
    const popoverConfig = document.getElementById('popover-configuracao');
    const fecharPopover = document.getElementById('fechar-popover-config');
    if (btnConfig && popoverConfig && fecharPopover) {
        btnConfig.addEventListener('click', function (e) {
            e.preventDefault();
            // Posição abaixo do botão
            const rect = btnConfig.getBoundingClientRect();
            popoverConfig.style.display = 'block';
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
            popoverConfig.style.top = top + 'px';
            popoverConfig.style.left = left + 'px';
        });
        fecharPopover.addEventListener('click', function () {
            popoverConfig.style.display = 'none';
        });
        // Fechar ao clicar fora do popover
        document.addEventListener('mousedown', function (e) {
            if (popoverConfig.style.display === 'block' && !popoverConfig.contains(e.target) && e.target !== btnConfig && !btnConfig.contains(e.target)) {
                popoverConfig.style.display = 'none';
            }
        });
    }
});
