const contenedor_productos = document.getElementById("gridProductos");
const botones_categoria = document.querySelectorAll(".side-menu button");

const boton_abrir_menu = document.getElementById("openMenu");
const boton_cerrar_menu = document.getElementById("closeMenu");
const menu_lateral = document.getElementById("menu");
const overlay_menu = document.getElementById("menuOverlay");

let lista_productos = [];

/* ================= CARGAR PRODUCTOS ================= */

fetch("data/productos.json")
  .then(respuesta => respuesta.json())
  .then(datos => {
    lista_productos = datos;
    mostrar_productos(lista_productos);
  });

/* ================= MOSTRAR PRODUCTOS ================= */

function mostrar_productos(productos) {
  contenedor_productos.innerHTML = "";

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

/* ================= FILTRAR POR CATEGORÍA ================= */

botones_categoria.forEach(boton => {
  boton.addEventListener("click", () => {
    const categoria = boton.dataset.cat;

    if (categoria === "all") {
      mostrar_productos(lista_productos);
    } else {
      const filtrados = lista_productos.filter(
        producto => producto.categoria === categoria
      );
      mostrar_productos(filtrados);
    }

    cerrar_menu();
  });
});

/* ================= MENU MOBILE ================= */

function abrir_menu() {
  menu_lateral.classList.add("open");
  overlay_menu.classList.add("show");
  document.body.classList.add("menu-open");
}

function cerrar_menu() {
  menu_lateral.classList.remove("open");
  overlay_menu.classList.remove("show");
  document.body.classList.remove("menu-open");
}

boton_abrir_menu.addEventListener("click", abrir_menu);
boton_cerrar_menu.addEventListener("click", cerrar_menu);
overlay_menu.addEventListener("click", cerrar_menu);


/* ================= MENU MOBILE SUBMENUS ================= */

const items_menu = document.querySelectorAll(".item_menu.tiene_submenu");

items_menu.forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("abierto");
  });
});
