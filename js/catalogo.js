const contenedor = document.getElementById("catalogo");
const categoriaLista = document.getElementById("categoriaLista");

let productos = [];

fetch("data/productos.json")
    .then(res => res.json())
    .then(data => {
        productos = data;
        mostrarProductos(productos);
    });

fetch("data/categoria.json")
    .then(res => res.json())
    .then(categorias => {
        categorias.forEach(cat => {
            const li = document.createElement("li");
            li.textContent = cat.nombre;
            li.onclick = () => {
                const filtrados = productos.filter(p => p.categoria === cat.id);
                mostrarProductos(filtrados);
            };
            categoriaLista.appendChild(li);
        });
    });

function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    lista.forEach(prod => {
        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
            <img src="${prod.imagen}">
            <div class="info">
                <h3>${prod.nombre}</h3>
                <p>$${prod.precio}</p>
            </div>
        `;
        contenedor.appendChild(div);
    });
}
