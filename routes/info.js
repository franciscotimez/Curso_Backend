import express from 'express';
import { cpus } from 'node:os';

const router = express.Router();

// Obtiene todos los productos
router.get(
  '/',
  (req, res) => {
    res.render('info', {
      argv: process.argv,
      platform: process.platform,
      nodeVersion: process.versions.node,
      memoryUsage: Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100,
      execPath: process.execPath,
      pid: process.pid,
      path: process.cwd(),
      cpus: cpus().length
    });
  }
);

export { router };