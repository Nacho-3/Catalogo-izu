const contenedor_detalle = document.getElementById("detalleProducto");
const parametros_url = new URLSearchParams(window.location.search);
const id_producto = parametros_url.get("id");

let imagenes_producto = [];
let imagen_actual = 0;
let bloqueado = false;
let talle_seleccionado = null;
let color_seleccionado = null;
let nombre_producto = "";

const mapeo_colores = {
  negro: "#1a1a1a",
  azul: "#0066cc",
  blanco: "#ffffff",
  rojo: "#cc0000",
  naranja: "#ff6600",
  verde: "#00aa00",
  amarillo: "#ffcc00",
  rosa: "#ff69b4",
  gris: "#808080",
  marron: "#654321",
  purpura: "#9900cc",
  celeste: "#00ccff"
};

function obtener_color_hex(nombre_color) {
  return mapeo_colores[nombre_color.toLowerCase()] || nombre_color;
}

fetch("data/productos.json")
  .then(res => res.json())
  .then(productos => {
    const producto = productos.find(p => p.id === id_producto);

    if (!producto) {
      contenedor_detalle.innerHTML = "<p>Producto no encontrado</p>";
      return;
    }

    nombre_producto = producto.nombre;
    imagenes_producto = producto.imagenes;

    contenedor_detalle.innerHTML = `
      <div class="col-md-6">
        <div class="galeria_producto">
          <button class="btn_galeria" id="btn_anterior">‹</button>
          <img id="imagen_producto" class="imagen_producto" src="${imagenes_producto[0]}" alt="${producto.nombre}">
          <button class="btn_galeria" id="btn_siguiente">›</button>
        </div>
      </div>
      <div class="col-md-6 info-producto">
        <h2 class="titulo-producto">${producto.nombre}</h2>
        <p class="descripcion">${producto.descripcion}</p>
        <p class="precio">$${producto.precio}</p>
        <h4>Talles Disponibles:</h4><div class="talles"></div>
        <h4>Colores Disponibles:</h4><div class="colores"></div>
        <button class="btn-consultar" id="btn_whatsapp">Consultar por Whatsapp</button>
      </div>`;

    activar_galeria();
    crear_talles(producto);
    activar_boton_whatsapp();
  });

function activar_galeria() {
  const imagen = document.getElementById("imagen_producto");
  const btn_anterior = document.getElementById("btn_anterior");
  const btn_siguiente = document.getElementById("btn_siguiente");

  btn_anterior.addEventListener("click", () => cambiar_imagen(-1));
  btn_siguiente.addEventListener("click", () => cambiar_imagen(1));
}

function cambiar_imagen(direccion) {
  if (bloqueado) return;

  bloqueado = true;

  const imagen = document.getElementById("imagen_producto");
  imagen.classList.add("imagen_oculta");

  setTimeout(() => {
    imagen_actual = (imagen_actual + direccion + imagenes_producto.length) % imagenes_producto.length;
    imagen.src = imagenes_producto[imagen_actual];
    imagen.classList.remove("imagen_oculta");
    bloqueado = false;
  }, 300);
}

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
        talle_seleccionado = talle;
        color_seleccionado = null;
        contenedor_colores.innerHTML = "";

        colores.forEach(color => {
          const div_color = document.createElement("div");
          div_color.className = "color";
          div_color.style.backgroundColor = obtener_color_hex(color);
          div_color.title = color;

          div_color.addEventListener("click", () => {
            document.querySelectorAll(".color").forEach(c => c.classList.remove("activo"));
            div_color.classList.add("activo");
            color_seleccionado = color;
          });

          contenedor_colores.appendChild(div_color);
        });
      });
    }

    contenedor_talles.appendChild(div_talle);
  });
}

function activar_boton_whatsapp() {
  const btn_whatsapp = document.getElementById("btn_whatsapp");
  const numero_whatsapp = "5493564526649";

  btn_whatsapp.addEventListener("click", () => {
    if (!talle_seleccionado) {
      alert("Por favor, selecciona un talle");
      return;
    }

    if (!color_seleccionado) {
      alert("Por favor, selecciona un color");
      return;
    }

    const mensaje = `Hola! Quiero consultar por el producto: ${nombre_producto}, Talle: ${talle_seleccionado}, Color: ${color_seleccionado}`;
    const mensaje_codificado = encodeURIComponent(mensaje);
    const url_whatsapp = `https://wa.me/${numero_whatsapp}?text=${mensaje_codificado}`;

    window.open(url_whatsapp, "_blank");
  });
}
