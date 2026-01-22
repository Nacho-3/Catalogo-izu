const grid = document.getElementById("gridProductos");
const botonesMenu = document.querySelectorAll(".side-menu button");

let productos = [];

fetch("data/productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data;
    renderProductos(productos);
  });

function renderProductos(lista) {
  grid.innerHTML = "";

  lista.forEach(prod => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-6";

    col.innerHTML = `
      <div class="card-producto">
        <img src="${prod.img}">
        <h3>${prod.nombre}</h3>
        <span class="precio">$${prod.precio}</span>
        <a href="producto.html?id=${prod.id}">
          <button>Ver producto</button>
        </a>
      </div>
    `;

    grid.appendChild(col);
  });
}

// filtros
botonesMenu.forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.cat;
    renderProductos(
      cat === "all" ? productos : productos.filter(p => p.categoria === cat)
    );
  });
});

// menú hamburguesa
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const menu = document.getElementById("menu");

if (openMenu && closeMenu) {
  openMenu.onclick = () => menu.classList.add("open");
  closeMenu.onclick = () => menu.classList.remove("open");
}
