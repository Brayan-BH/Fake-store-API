const menu = document.querySelector("#category");
const urlCategory = "https://fakestoreapi.com/products/categories";
const urlProducts = "https://fakestoreapi.com/products";
var category = [];
var products = [];

async function fetchData() {
  try {
    const [categoryData, productData] = await Promise.all([
      fetch(urlCategory).then((response) => response.json()),
      fetch(urlProducts).then((response) => response.json())
    ]);

    console.log("Categorias:", categoryData);
    category = categoryData;

    console.log("Productos:", productData);
    products = productData;


    const contenedor = document.getElementById("productos-contenedor");
    contenedor.innerHTML = "";
    for (const prod of products) {
      const prodEl = crearBloqueProducto(prod);
      contenedor.appendChild(prodEl);
    }

    for (const cat of category) {
      const button = document.createElement("button");
      button.textContent = cat;
      
      button.onclick = () => {showProductsByCategory(cat)};
      menu.appendChild(button);
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}


function showProductsByCategory(categoryname) {
  const productosFiltrados = products.filter(
    (producto) => producto.category === categoryname
  );
  const contenedor = document.getElementById("productos-contenedor");
  contenedor.innerHTML = "";
  for (const producto of productosFiltrados) {
    const prodEl = crearBloqueProducto(producto);
    contenedor.appendChild(prodEl);
  }
}


function crearBloqueProducto(producto) {
  const prodContenedor = document.createElement("article");
  const prodImg = document.createElement("img");
  const prodNombre = document.createElement("header");
  const prodDetalle = document.createElement("aside");
  const prodPrecio = document.createElement("div");
  const prodBoton = document.createElement("button");
  prodContenedor.className = "producto-item";
  prodImg.src = producto.image;

  prodNombre.textContent = producto.title;
  prodPrecio.textContent = `S/. ${producto.price}`;
  prodBoton.textContent = "Comprar";
  prodBoton.onclick = () => comprarProducto(producto);

  prodDetalle.appendChild(prodPrecio);
  prodDetalle.appendChild(prodBoton);

  prodContenedor.appendChild(prodImg);
  prodContenedor.appendChild(prodNombre);
  prodContenedor.appendChild(prodDetalle);
  return prodContenedor;
}

function comprarProducto(producto) {
  console.log("COMPRAR", producto);
}

fetchData();