import dotenv from 'dotenv';
import parseArgs from 'minimist';
import { normalizePort } from './helpers/helpers.js';

dotenv.config();

const args = parseArgs(process.argv.slice(2), {
  alias: {
    p: "PORT"
  }
});

// console.log(args);

export const config = {
  PORT: normalizePort(args.PORT || process.env.PORT || '8080'),
  MONGO_URL: process.env.MONGO_CONN_STRING
};