
const normalizeProduct = (product) => {
    // Verifico el id
    if (product.id) {
        product.id = Number(product.id);
        if (isNaN(product.id)) {
            throw new Error(`productKey: id: is not a number`);
        }
    }
    // Verifico o creo el timestamp
    product.timestamp = product.timestamp ? product.timestamp : Date.now();

    const keysBeNumber = ["timestamp", "code", "price", "stock"];
    const keysBeString = ["name", "description", "image"];

    for (const key of keysBeNumber) {
        product[key] = Number(product[key]);
        if (isNaN(product[key])) {
            throw new Error(`productKey: ${key}: is not a number`);
        }
    }

    for (const key of keysBeString) {
        if (typeof (product[key]) !== 'string') {
            throw new Error(`productKey: ${key}: is not a string`);
        }
    }

    const { id, timestamp, name, description, code, image, price, stock } = product;
    return {
        ...(id ? { id } : {}),
        timestamp,
        name,
        description,
        code,
        image,
        price,
        stock,
    };
};

module.exports = { normalizeProduct };