import express from 'express';
import { fork } from 'child_process';

const router = express.Router();

// Obtiene todos los productos
router.get(
  '/',
  ({ query }, res) => {
    let cant = Number(query.cant);
    let range = Number(query.range);

    if (isNaN(cant))
      cant = 100000000;

    if (isNaN(range))
      range = 1000;

    console.log("---> Inicio child_process");
    const forked = fork('batch/randomNumbers.js');
    forked.on("message", msg => {
      if (msg === "ready")
        forked.send({ cant, range });
      else {
        console.log("---> Fin child_process");
        res.json(msg);
      }
    });
  }
);

export { router };