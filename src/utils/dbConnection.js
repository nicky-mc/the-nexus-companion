import pg from "pg";
import { auth } from "@clerk/nextjs/server";

function connect() {
  const dbConnectionString = process.env.NEXT_SUPABASE_DB_CONNECTION;
  const db = new pg.Pool({
    connectionString: dbConnectionString,
  });
    return db;
}

const pool = connect();

// Combine `pool` and `auth` under a single export
export const db = {
  pool,
  auth,
};
