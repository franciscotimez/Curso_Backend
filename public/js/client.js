const socket = io();


console.log("Holis")
let template = `{{#each products}}
  <div class="col-md-2">
    <div class="card">
      <img
        src="{{this.thumbnail}}"
        class="card-img-top"
        alt="{{this.title}}"
      />
      <div class="card-body">
        <h5 class="card-title">{{this.title}}</h5>
      </div>
      <h6 class="card-footer">Precio: \${{this.price}}</h6>
    </div>
  </div>
{{/each}}
`;

console.log(template);

socket.on('products-channel', (data) => {
    console.log("Data recibida por products-channel: ", data);
    let renderProducts = Handlebars.compile(template);
    // console.log(renderProducts());
    document.getElementById("products-list").innerHTML = renderProducts({
        products: data,
        listExists: data.length > 0
      });
});