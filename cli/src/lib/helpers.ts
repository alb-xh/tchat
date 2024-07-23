import process from "node:process";
import path from 'node:path';
import { fileURLToPath } from "node:url";

export const getFilename = () => fileURLToPath(import.meta.url);

export const getDirname = () => path.dirname(getFilename()); //

export const isProduction = () => process.env['NODE_ENV'] === 'production';