const contenedor_detalle = document.getElementById("detalleProducto");

/* ================= OBTENER ID ================= */

const parametros_url = new URLSearchParams(window.location.search);
const id_producto = parametros_url.get("id");

let imagenes_producto = [];
let imagen_actual = 0;

/* ================= CARGAR PRODUCTO ================= */

fetch("data/productos.json")
  .then(respuesta => respuesta.json())
  .then(productos => {
    const producto = productos.find(p => p.id === id_producto);

    if (!producto) {
      contenedor_detalle.innerHTML = "<p>Producto no encontrado</p>";
      return;
    }

    imagenes_producto = producto.imagenes;

    /* ================= HTML ================= */

    contenedor_detalle.innerHTML = `
      <div class="col-md-6">

        <div class="galeria_producto">
          <button class="btn_galeria" id="btn_anterior">‹</button>

          <img
            id="imagen_producto"
            class="imagen_producto"
            src="${imagenes_producto[0]}"
            alt="${producto.nombre}"
          >

          <button class="btn_galeria" id="btn_siguiente">›</button>
        </div>

      </div>

      <div class="col-md-6 info-producto">
        <h2 class="titulo-producto">${producto.nombre}</h2>
        <p class="descripcion">${producto.descripcion}</p>
        <p class="precio">$${producto.precio}</p>

        <h4>Talles Disponibles:</h4>
        <div class="talles"></div>

        <h4>Colores Disponibles:</h4>
        <div class="colores"></div>

        <button class="btn-consultar">Consultar por Whatsapp</button>
      </div>
    `;

    activar_galeria();
    crear_talles(producto);
  });

/* ================= GALERÍA ================= */

function activar_galeria() {
  const imagen = document.getElementById("imagen_producto");
  const btn_anterior = document.getElementById("btn_anterior");
  const btn_siguiente = document.getElementById("btn_siguiente");

  btn_anterior.addEventListener("click", () => cambiar_imagen(-1));
  btn_siguiente.addEventListener("click", () => cambiar_imagen(1));
}

function cambiar_imagen(direccion) {
  const imagen = document.getElementById("imagen_producto");

  imagen.classList.add("fade_oculto");

  setTimeout(() => {
    imagen_actual += direccion;

    if (imagen_actual >= imagenes_producto.length) {
      imagen_actual = 0;
    }

    if (imagen_actual < 0) {
      imagen_actual = imagenes_producto.length - 1;
    }

    imagen.src = imagenes_producto[imagen_actual];
    imagen.classList.remove("fade_oculto");
  }, 200);
}

/* ================= TALLES Y COLORES ================= */

function crear_talles(producto) {
  const contenedor_talles = document.querySelector(".talles");
  const contenedor_colores = document.querySelector(".colores");

  Object.entries(producto.talles).forEach(([talle, colores]) => {
    const div_talle = document.createElement("div");
    div_talle.className = "talle";
    div_talle.textContent = talle;

    if (colores.length === 0) {
      div_talle.classList.add("agotado");
    } else {
      div_talle.addEventListener("click", () => {
        document.querySelectorAll(".talle").forEach(t => t.classList.remove("activo"));
        div_talle.classList.add("activo");

        contenedor_colores.innerHTML = "";

        colores.forEach(color => {
          const div_color = document.createElement("div");
          div_color.className = "color";
          div_color.style.backgroundColor = color;

          div_color.addEventListener("click", () => {
            document.querySelectorAll(".color").forEach(c => c.classList.remove("activo"));
            div_color.classList.add("activo");
          });

          contenedor_colores.appendChild(div_color);
        });
      });
    }

    contenedor_talles.appendChild(div_talle);
  });
}
