
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

// Alterando a URL para usar o connection pooler do Neon
const poolUrl = DATABASE_URL.includes('-pooler') ? DATABASE_URL : DATABASE_URL.replace('.sa-east-1', '-pooler.sa-east-1');

export const pool = new Pool({ connectionString: poolUrl });
export const db = drizzle(pool, { schema });
