import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as dotenv from "dotenv";

// Cargar variables desde `.env.local`
dotenv.config({ path: ".env.local" });

export const auth = betterAuth({
    database: db ? drizzleAdapter(db, {
        provider: "pg", 
    }) : null,
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string , 
            redirectURI: "http://localhost:4321/api/auth/callback/github"
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirectURI: "http://localhost:4321/api/auth/callback/google"
            
            
        }
    },
    trustedOrigins: [
        "http://localhost:4321",  // Asegúrate de agregar este valor aquí
        "http://localhost:4322",
        "http://localhost:4323"   // Este ya está por defecto, mantenlo si es necesario
    ] 
 
});
