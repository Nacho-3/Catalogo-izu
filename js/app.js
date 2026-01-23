const grid = document.getElementById("gridProductos");
const botonesMenu = document.querySelectorAll(".side-menu button");

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const menu = document.getElementById("menu");
const overlay = document.getElementById("menuOverlay");

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
        <img src="${prod.img}" alt="${prod.nombre}">
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


botonesMenu.forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.cat;

    if (!cat) return;

    if (cat === "all") {
      renderProductos(productos);
    } else {
      renderProductos(productos.filter(p => p.categoria === cat));
    }

    cerrarMenu();
  });
});


function abrirMenu() {
  menu.classList.add("open");
  overlay.classList.add("show");
  document.body.classList.add("menu-open");
}

function cerrarMenu() {
  menu.classList.remove("open");
  overlay.classList.remove("show");
  document.body.classList.remove("menu-open");
}

openMenu.addEventListener("click", abrirMenu);
closeMenu.addEventListener("click", cerrarMenu);
overlay.addEventListener("click", cerrarMenu);
