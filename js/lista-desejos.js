
       fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navbar-container').innerHTML = data;
             // Inicializar popover de configuração
                const btnConfig = document.getElementById('configuracao-btn');
                const popoverConfig = document.getElementById('popover-configuracao');
                const fecharPopover = document.getElementById('fechar-popover-config');
                if (btnConfig && popoverConfig && fecharPopover) {
                    btnConfig.addEventListener('click', function (e) {
                        e.preventDefault();
                        const rect = btnConfig.getBoundingClientRect();
                        popoverConfig.style.display = 'block';
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
                        popoverConfig.style.top = top + 'px';
                        popoverConfig.style.left = left + 'px';
                    });
                    fecharPopover.addEventListener('click', function () {
                        popoverConfig.style.display = 'none';
                    });
                    document.addEventListener('mousedown', function (e) {
                        if (popoverConfig.style.display === 'block' && !popoverConfig.contains(e.target) && e.target !== btnConfig && !btnConfig.contains(e.target)) {
                            popoverConfig.style.display = 'none';
                        }
                    });
                }
            
            });
    

      const form = document.getElementById("wishlist-form");
      const wishlistEl = document.getElementById("wishlist");
      const modal = document.getElementById("edit-modal");
      const closeModalBtn = document.getElementById("close-modal");
      const editForm = document.getElementById("edit-form");

      let wishlist = [];
      let editIndex = null;

      function renderList() {
        wishlistEl.innerHTML = "";
        wishlist.forEach((item, index) => {
          const card = document.createElement("div");
          card.classList.add("wishlist-card");

          let imgHtml = "";
          if (item.imageData) {
            imgHtml = item.link
              ? `<a href="${item.link}" target="_blank"><img src="${item.imageData}" alt="${item.name}"></a>`
              : `<img src="${item.imageData}" alt="${item.name}">`;
          }

          let nameHtml =
            !item.imageData && item.link
              ? `<a href="${item.link}" target="_blank">${item.name}</a>`
              : item.name;

          card.innerHTML = `
      <div class="item-info">
        ${imgHtml}
        <div class="item-text">
          <div class="item-name">${nameHtml}</div>
          <div class="item-value">R$ ${item.value.toFixed(2)}</div>
        </div>
      </div>
      <div class="card-buttons">
        <button class="edit-btn" onclick="openEditModal(${index})">Editar</button>
        <button class="delete-btn" onclick="deleteItem(${index})">Excluir</button>
      </div>
    `;
          wishlistEl.appendChild(card);
        });
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("item-name").value.trim();
        const value = parseFloat(document.getElementById("item-value").value);
        const link = document.getElementById("item-link").value.trim();
        const imageFile = document.getElementById("item-image").files[0];

        if (!name || isNaN(value)) return;

        if (imageFile) {
          const reader = new FileReader();
          reader.onload = function (event) {
            wishlist.push({
              name,
              value,
              link: link || "",
              imageData: event.target.result,
            });
            form.reset();
            renderList();
          };
          reader.readAsDataURL(imageFile);
        } else {
          wishlist.push({ name, value, link: link || "", imageData: "" });
          form.reset();
          renderList();
        }
      });

      function deleteItem(index) {
        if (confirm("Deseja realmente excluir este item?")) {
          wishlist.splice(index, 1);
          renderList();
        }
      }

      /* Modal de edição */
      function openEditModal(index) {
        editIndex = index;
        const item = wishlist[index];
        document.getElementById("edit-name").value = item.name;
        document.getElementById("edit-value").value = item.value;
        document.getElementById("edit-link").value = item.link;
        document.getElementById("edit-image").value = "";
        modal.style.display = "flex";
      }

      closeModalBtn.onclick = () => {
        modal.style.display = "none";
      };

      window.onclick = (e) => {
        if (e.target === modal) modal.style.display = "none";
      };

      editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newName = document.getElementById("edit-name").value.trim();
        const newValue = parseFloat(
          document.getElementById("edit-value").value
        );
        const newLink = document.getElementById("edit-link").value.trim();
        const newImageFile = document.getElementById("edit-image").files[0];

        if (editIndex === null || !newName || isNaN(newValue)) return;

        if (newImageFile) {
          const reader = new FileReader();
          reader.onload = function (event) {
            wishlist[editIndex] = {
              name: newName,
              value: newValue,
              link: newLink || "",
              imageData: event.target.result,
            };
            modal.style.display = "none";
            renderList();
          };
          reader.readAsDataURL(newImageFile);
        } else {
          const oldImage = wishlist[editIndex].imageData || "";
          wishlist[editIndex] = {
            name: newName,
            value: newValue,
            link: newLink || "",
            imageData: oldImage,
          };
          modal.style.display = "none";
          renderList();
        }
      });
    
