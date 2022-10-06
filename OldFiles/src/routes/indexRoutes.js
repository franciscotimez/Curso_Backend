import express from 'express';

const router = express.Router();

router.get('', (req, res) => {
    res.send({ msg: "Un mensaje" });
});

router.get('/:id', ({ params }, res) => {
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return res.json({ error: 'El parametro no es un numero' });
    }

    
    console.log(params);
    res.send({ msg: "Un mensaje" });
    // { error: 'Producto no encontrado'}
});

router.post('', ({ body }, res) => {
    res.send({ msg: "Un mensaje" });
});

router.put('/:id', ({ params }, res) => {
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return res.json({ error: 'El parametro no es un numero' });
    }


    console.log(params);
    res.send({ msg: "Un mensaje" });
    // { error: 'Producto no encontrado'}
});

router.delete('/:id', ({ params }, res) => {
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return res.json({ error: 'El parametro no es un numero' });
    }


    console.log(params);
    res.send({ msg: "Un mensaje" });
    // { error: 'Producto no encontrado'}
});

module.exports = router;