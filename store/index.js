import { Contenedor } from './contenedor';


(async () => {
    const productos = new Contenedor("./products.json");

    let result = ``;

    result = await productos.save({
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
    });
    console.log(result);

    result = await productos.save({
        title: "Calculadora",
        price: 234.56,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    });
    console.log(result);

    result = await productos.save({
        title: "Globo Terráqueo",
        price: 345.67,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    });
    console.log(result);

    result = await productos.getById(2);
    console.log("Producto 2: ", result);

    result = await productos.getAll();
    console.log(result);

    // result = await productos.deleteById(2);
    // console.log(result);

    // result = await productos.deleteAll()
})();

