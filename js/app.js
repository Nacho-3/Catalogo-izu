const contenedor_productos = document.getElementById("gridProductos");
const menu_principal = document.querySelector(".menu_principal");
const btn_menu = document.getElementById("openMenu");
const overlay_menu = document.getElementById("menuOverlay");
const searchInput = document.getElementById("searchInput");

let lista_productos = [];
let filtroActivo = {
  categoria: null,
  subcategoria: null
};

fetch("data/productos.json")
  .then(res => res.json())
  .then(data => {
    lista_productos = data;
    mostrar_productos(lista_productos);
  });

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

btn_menu.addEventListener("click", () => {
  menu_principal.classList.toggle("abierto");
  overlay_menu.classList.toggle("show");

  document.querySelectorAll(".item_menu.abierto")
    .forEach(i => i.classList.remove("abierto"));
});

overlay_menu.addEventListener("click", cerrar_menu);

function cerrar_menu() {
  menu_principal.classList.remove("abierto");
  overlay_menu.classList.remove("show");

  document.querySelectorAll(".item_menu.abierto")
    .forEach(i => i.classList.remove("abierto"));
}

const categoriasPadre = document.querySelectorAll(".item_menu.tiene_submenu");

categoriasPadre.forEach(item => {
  item.addEventListener("click", e => {
    if (window.innerWidth > 768) return;

    e.preventDefault();
    e.stopPropagation();

    categoriasPadre.forEach(i => {
      if (i !== item) i.classList.remove("abierto");
    });

    item.classList.toggle("abierto");
  });
});

document.querySelectorAll(
  ".submenu .filtro, .item_menu.filtro:not(.tiene_submenu)"
).forEach(filtro => {
  filtro.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();

    const categoria = filtro.dataset.categoria;
    const subcategoria = filtro.dataset.subcategoria;

    if (subcategoria) {
      mostrar_productos(lista_productos.filter(p => p.subcategoria === subcategoria));
    } else if (categoria === "todos") {
      mostrar_productos(lista_productos);
    } else {
      mostrar_productos(lista_productos.filter(p => p.categoria === categoria));
    }

    cerrar_menu();
  });
});

function aplicarFiltros() {
  let resultado = [...lista_productos];

  if (filtroActivo.categoria && filtroActivo.categoria !== "todos") {
    resultado = resultado.filter(p => p.categoria === filtroActivo.categoria);
  }

  if (filtroActivo.subcategoria) {
    resultado = resultado.filter(p => p.subcategoria === filtroActivo.subcategoria);
  }

  const texto = searchInput.value.toLowerCase().trim();

  if (texto !== "") {
    resultado = resultado.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto)
    );
  }

  mostrar_productos(resultado);
}

searchInput.addEventListener("input", aplicarFiltros);