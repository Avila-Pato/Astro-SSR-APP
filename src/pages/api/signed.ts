import type { APIRoute } from "astro";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { paramsToSign } = body;

    // Reordenar los parámetros en el orden correcto
    const orderedParams = {
        source: paramsToSign.source,
        timestamp: paramsToSign.timestamp,
        upload_preset: paramsToSign.upload_preset,
    };

    // Verifica los parámetros recibidos
    console.log("Params to sign (ordered):", orderedParams);

    // Genera la firma
    const signature = cloudinary.utils.api_sign_request(orderedParams, import.meta.env.CLOUDINARY_API_SECRET);

    console.log("Firma generada:", signature);

    return new Response(JSON.stringify({ signature }), {
        headers: { "Content-Type": "application/json" },
    });
};