const { normalizeProduct } = require("./product");

const normalizeCart = (cart) => {
    // Verifico el id
    if (cart.id) {
        cart.id = Number(cart.id);
        if (isNaN(cart.id)) {
            throw new Error(`cartKey: id: is not a number`);
        }
    }
    // Verifico o creo el timestamp
    cart.timestamp = cart.timestamp ? cart.timestamp : Date.now();
    
    const keysBeNumber = ["timestamp"];
    
    for (const key of keysBeNumber) {
        if (typeof (cart[key]) !== 'number') {
            throw new Error(`cartKey: ${key}: is not a number`);
        }
    }
    
    
    for (const key in cart.products) {
        try {
            cart.products[key] = normalizeProduct(cart.products[key]);
        } catch (error) {
            throw new Error(`cartProductsKey: products[${key}]: ${error.message}`);
        }
    }
    
    const { id, timestamp, products } = cart;
    
    return {
        ...(id ? { id } : {}),
        timestamp,
        products
    };
};

module.exports = { normalizeCart };