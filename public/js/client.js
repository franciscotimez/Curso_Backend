// Define a users schema
const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });

// Define your comments schema
const mensajeSchema = new normalizr.schema.Entity('mensaje', {
  author: authorSchema
});

const mensajesSchema = new normalizr.schema.Entity('mensajes', {
  mensajes: [mensajeSchema]
});


let socket = io();

let productsData = [];
// let msgData = [];

let templates = {
  productsList: {
    url: './resources/views/products_list.hbs',
    template: ''
  },
  chatBox: {
    url: './resources/views/chat_box.hbs',
    template: ''
  },
  messagesList: {
    url: './resources/views/messages_list.hbs',
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
  productsData = [...productsData, data];

  let renderProducts = Handlebars.compile(templates.productsList.template);
  document.getElementById("products-list").innerHTML = renderProducts({
    products: productsData,
    listExists: productsData.length > 0
  });
});

socket.on("newMessage-channel", (dataNormalizada) => {
  console.log("Nuevo message recibido");
  // console.log(data);
  // msgData.push( data);
  let dataDenormalizada = normalizr.denormalize(dataNormalizada.result, mensajesSchema, dataNormalizada.entities);

  console.log("Size Normalized: ", JSON.stringify(dataNormalizada).length);
  console.log("Size DeNormalized: ", JSON.stringify(dataDenormalizada).length);
  renderMessages(dataDenormalizada.mensajes);
});


// listener para el formulario de producto
const formProduct = document.getElementById("form-product");
formProduct.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = {
    title: formProduct.elements["title"].value,
    price: formProduct.elements["price"].value,
    thumbnail: formProduct.elements["thumbnail"].value
  };

  const res = await fetch("/api/productos", {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const newProduct = await res.json();
  console.log(newProduct);
  socket.emit("newProduct-channel", newProduct);
  formProduct.reset();
});

// listener para el formulario del chat
let formChat;
let author = {};
const onSubmitMsg = (event) => {
  event.preventDefault();

  const data = {
    message: formChat.elements["inputMsg"].value,
    date: new Date().toLocaleString(),
    author: author
  };
  console.log("Nuevo msg: ", data);
  socket.emit("newMessage-channel", data);
  formChat.reset();
};

// listener para el formulario del chat
const formAuthor = document.getElementById("form-author");
formAuthor.addEventListener('submit', (event) => {
  event.preventDefault();

  author = {
    email: formAuthor.elements["inputEmail"].value,
    name: formAuthor.elements["inputName"].value,
    lastname: formAuthor.elements["inputLastname"].value,
    age: formAuthor.elements["inputAge"].value,
    alias: formAuthor.elements["inputAlias"].value,
    avatar: formAuthor.elements["inputAvatar"].value,
  };
  if (author.email.indexOf('@') >= 0) {
    let renderChat = Handlebars.compile(templates.chatBox.template);
    document.getElementById("chat-box").innerHTML = renderChat({
      userEmail: author.email
    });
    socket.emit("newMessage-channel", "start");
    renderMessages([]);
    formChat = document.getElementById("form-chat");
    formChat.addEventListener('submit', onSubmitMsg);
  }
});

const renderMessages = (messages) => {
  console.log("Render", messages);
  let renderMessagesList = Handlebars.compile(templates.messagesList.template);
  document.getElementById("message-list").innerHTML = renderMessagesList({
    messages: messages,
    msgExists: messages.length > 0,
  });

  console.log({
    data: messages,
    msgExists: messages.length,
  });
};
