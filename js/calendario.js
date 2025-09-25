
      fetch("navbar.html")
        .then((response) => response.text())
        .then((data) => {
          document.getElementById("navbar-container").innerHTML = data;
          // Inicializar popover de configuração
          const btnConfig = document.getElementById("configuracao-btn");
          const popoverConfig = document.getElementById("popover-configuracao");
          const fecharPopover = document.getElementById(
            "fechar-popover-config"
          );
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
        });
    

      document.addEventListener("DOMContentLoaded", function () {
        const calendarEl = document.getElementById("calendar");

        // Lista de despesas
        const despesas = [
          {
            title: "Conta de Luz",
            date: "2025-09-20",
            valor: 120,
            tipo: "Despesa Fixa",
          },
          {
            title: "Cartão de Crédito",
            date: "2025-09-22",
            valor: 850,
            tipo: "Cartão de Crédito",
          },
          { title: "Internet", date: "2025-09-25", valor: 100, tipo: "Pago" },
        ];

        // Cores por tipo
        const cores = {
          "Despesa Fixa": "red",
          "Cartão de Crédito": "orange",
          Pago: "#009c3b",
        };

        // Cria eventos
        const events = despesas.map((d) => ({
          title: `${d.title} - R$ ${d.valor}`,
          start: d.date,
          classNames: [
            "fc-event-" +
              (d.tipo === "Despesa Fixa"
                ? "red"
                : d.tipo === "Cartão de Crédito"
                ? "orange"
                : "green"),
          ],
          extendedProps: { tipo: d.tipo },
        }));

        // Inicializa o calendário
        const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: "timeGridWeek", // Semana com horários
          locale: "pt-br",
          firstDay: 1,
          headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          },
          buttonText: {
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
          },
          allDayText: "Dia todo",
          events: events,
          views: {
            timeGridWeek: {
              allDaySlot: true,
              slotMinTime: "00:00:00",
              slotMaxTime: "24:00:00",
              slotLabelFormat: [
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourSuffix: "h",
                },
              ],
              dayHeaderFormat: {
                weekday: "long",
                day: "numeric",
                month: "short",
              },
            },
            timeGridDay: {
              allDaySlot: true,
              slotMinTime: "00:00:00",
              slotMaxTime: "24:00:00",
              slotLabelFormat: [
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourSuffix: "h",
                },
              ],
              dayHeaderFormat: {
                weekday: "long",
                day: "numeric",
                month: "short",
              },
            },
          },
        });

        calendar.render();

        // Legenda automática
        const tiposUnicos = [...new Set(despesas.map((d) => d.tipo))];
        const legendaContainer = document.createElement("div");
        legendaContainer.className = "legenda-calendario";

        tiposUnicos.forEach((tipo) => {
          const span = document.createElement("span");
          span.className = "legenda-item";
          span.style.background = cores[tipo];
          legendaContainer.appendChild(span);
          legendaContainer.appendChild(
            document.createTextNode(" " + tipo + " ")
          );
        });

        document.querySelector(".conteudo").appendChild(legendaContainer);
      });
    
