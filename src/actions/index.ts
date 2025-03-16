import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db } from "../db";
import { userImage } from "../db/schema";
import { createId } from "@paralleldrive/cuid2";

export const server = {
    addImage: defineAction({
        input: z.object({
            publicId: z.string(),
            format: z.string().optional(),
        }),
        handler: async ({ publicId, format }, context) => {
            const currentUser = context.locals.user?.id;
            if (!currentUser) {
                throw new Error('Usuario no encontrado');
            }

            if (!db) {
                throw new Error('La base de datos no está inicializada');
            }

            try {
                const imageData = {
                    id: createId(),
                    userId: currentUser,
                    url: publicId,
                    format: format || 'jpg',
                    descriptions: null,
                    visibility: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                console.log("Datos a insertar:", imageData);

                const newImage = await db
                    .insert(userImage)
                    .values(imageData)
                    .returning();

                if (!newImage || newImage.length === 0) {
                    throw new Error('No se pudo insertar la imagen');
                }

                console.log("Imagen insertada correctamente:", newImage[0]);
                return { success: true, image: newImage[0].url };
            } catch (error) {
                console.error("Error al crear la imagen:", error);
                throw new Error('Error al crear la imagen');
            }
        },
    })
};