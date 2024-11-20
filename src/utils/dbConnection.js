import pg from "pg";

function db() {
  const dbConnectionString = process.env.NEXT_SUPABASE_DB_CONNECTION;
  const db = new pg.Pool({
    connectionString: dbConnectionString,
  });
    return db;
}

export default db;