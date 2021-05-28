import { loadConfig } from './config';
import { runExpress } from './express';
import { connectDB } from './db';

export function initializeServer() {
  loadConfig();
  connectDB();
  runExpress();
}
