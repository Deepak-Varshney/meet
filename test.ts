import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const result = await sql`SELECT 1`;

    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

main();