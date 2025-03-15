import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" });

export default defineConfig({
   dialect: 'postgresql', // Ruta de los modelos
  out: "./src/db/migrations", // Carpeta donde se guardarán las migraciones
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
});
