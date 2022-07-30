const { Contenedor } = require('./contenedor');


( async () => {
    const productos = new Contenedor("./products.json")

    let result = ``

    result = await productos.save({
        title: "Producto 1",
        price: 25.4,
        thumbnail: "https://images.com/img1.jpg"
    })
    console.log(result)

    result = await productos.save({
        title: "Producto 2",
        price: 52.21,
        thumbnail: "https://images.com/img2.jpg"
    })
    console.log(result)

    result = await productos.save({
        title: "Producto 3",
        price: 1552.26,
        thumbnail: "https://images.com/img3.jpg"
    })
    console.log(result)

    result = await productos.getById(2)
    console.log("Producto 2: ",result)

    result = await productos.getAll()
    console.log(result)

    result = await productos.deleteById(2)
    console.log(result)

    // result = await productos.deleteAll()
})()

