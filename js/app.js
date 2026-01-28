const contenedor_productos = document.getElementById("gridProductos");
const menu_principal = document.querySelector(".menu_principal");
const btn_menu = document.getElementById("openMenu");
const overlay_menu = document.getElementById("menuOverlay");

let lista_productos = [];

/* =============================
   CARGA DE PRODUCTOS
============================= */
fetch("data/productos.json")
  .then(res => res.json())
  .then(datos => {
    lista_productos = datos;
    mostrar_productos(lista_productos);
  });

/* =============================
   MOSTRAR PRODUCTOS
============================= */
function mostrar_productos(productos) {
  contenedor_productos.innerHTML = "";

  if (productos.length === 0) {
    contenedor_productos.innerHTML = "<p>No hay productos para mostrar</p>";
    return;
  }

  productos.forEach(producto => {
    const columna = document.createElement("div");
    columna.className = "col-lg-3 col-md-4 col-sm-6";

    columna.innerHTML = `
      <div class="card-producto">
        <img src="${producto.imagenes[0]}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <span class="precio">$${producto.precio}</span>
        <a href="producto.html?id=${producto.id}">
          <button>Ver producto</button>
        </a>
      </div>
    `;

    contenedor_productos.appendChild(columna);
  });
}

/* =============================
   FILTROS DEL MENU
============================= */
document.querySelectorAll(".submenu a, .item_menu[data-categoria]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const categoria = link.dataset.categoria;
    const subcategoria = link.dataset.subcategoria;
    const tipo = link.dataset.tipo;

    let filtrados = lista_productos;

    if (tipo !== "all") {
      filtrados = filtrados.filter(p => p.categoria === categoria);

      if (subcategoria) {
        filtrados = filtrados.filter(p => p.subcategoria === subcategoria);
      }
    }

    mostrar_productos(filtrados);
    cerrar_menu();
  });
});

/* =============================
   MENU HAMBURGUESA
============================= */
btn_menu.addEventListener("click", () => {
  menu_principal.classList.toggle("abierto");
  overlay_menu.classList.toggle("show");
});

overlay_menu.addEventListener("click", cerrar_menu);

function cerrar_menu() {
  menu_principal.classList.remove("abierto");
  overlay_menu.classList.remove("show");
}

/* =============================
   SUBMENUS MOBILE
============================= */
const items_menu = document.querySelectorAll(".item_menu.tiene_submenu");

items_menu.forEach(item => {
  item.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      items_menu.forEach(i => {
        if (i !== item) i.classList.remove("abierto");
      });
      item.classList.toggle("abierto");
    }
  });
});
