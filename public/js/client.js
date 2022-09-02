let socket = io();

let productsData = [];

let templates = {
  productsList: {
    url: './resources/views/products_list.hbs',
    template: ''
  }
};

const loadTempletes = async () => {
  for (key in templates) {
    let template = await fetch(templates[key].url);
    templates[key].template = await template.text();
  }
  console.log(templates);
};

loadTempletes();


socket.on('products-channel', (data) => {
  console.log("Data recibida por products-channel: ", data);
  productsData = data;
  
  let renderProducts = Handlebars.compile(templates.productsList.template);
  document.getElementById("products-list").innerHTML = renderProducts({
    products: productsData,
    listExists: productsData.length > 0
  });
});

socket.on("newProduct-channel", (data) => {
  console.log("Nuevo Producto Recibido");
  productsData = [...productsData, data]
  
  let renderProducts = Handlebars.compile(templates.productsList.template);
  document.getElementById("products-list").innerHTML = renderProducts({
    products: productsData,
    listExists: productsData.length > 0
  });
});

// listener para el formulario de producto
const formProduct = document.getElementById("form-product");
formProduct.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = {
    title: formProduct.elements["title"].value,
    price: formProduct.elements["price"].value,
    thumbnail: formProduct.elements["thumbnail"].value
  }

  const res = await fetch("/api/productos", {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  })
  const newProduct = await res.json()
  console.log(newProduct);
  socket.emit("newProduct-channel", newProduct);
});