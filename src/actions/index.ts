import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db } from "../db";
import { imageLike, userImage } from "../db/schema";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";
import Visibility from "../components/visibility";

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
    }),

    // manejando si el usuario le gusto la imagen 
    likeImage: defineAction({
        input: z.object({
            imageId: z.string()
        }),
        handler: async ({ imageId }, context) => {
            const currentUser = context.locals.user?.id;
            if (!currentUser) {
                throw new Error('Usuario no encontrado');
            }

            if(!db) {
                throw new Error('La base de datos no se esta inicializada');
            }

            try {
                const existingLike = await db.query.imageLike.findFirst({
                    where: and(
                        eq(imageLike.userId, currentUser),
                        eq(imageLike.imageId, imageId)
                        ),
                })
                if(existingLike) {
                    // Remueve los likes
                    const deleteLike = await db
                    .delete(imageLike)
                    .where(
                        and(
                            eq(imageLike.userId, currentUser),
                            eq(imageLike.imageId, imageId)
                        )
                    )
                    .returning();
                    return { success: deleteLike[0]}
                } else {
                    // Agrega los likes
                    const newLike = await db
                    .insert(imageLike)
                    .values({
                        id: createId(),
                        userId: currentUser,
                        imageId: imageId,
                        // createdAt: new Date(),
                        // updatedAt: new Date(),
                    })
                    .returning();
                    return { success: newLike[0]}
                }
            } catch (error) {
                console.error("Error al crear la imagen:", error);
                throw new Error('Error al crear la imagen');
                
            }
        }
    }),
    toggleVisibility: defineAction({
        input: z.object({
            imageId: z.string(),
        }),
        handler: async ({ imageId }, context) => {
            const currentUser = context.locals.user?.id;
            if(!currentUser) {
                throw new Error('Usuario no encontrado');
            }

            if(!db) {
                throw new Error('La base de datos no se esta inicializada');
            }

            try {
                const existingImage = await db.query.userImage.findFirst({
                    where: and((
                        eq(userImage.id, imageId),
                        eq(userImage.userId, currentUser)
                    )),
                })

                if(!existingImage) {
                    throw new Error('Imagen no encontrada o no autorizada');
                }

                // Actualizando  la visibilidad de la imagen
                const updateImage = await db
                .update(userImage)
                .set({
                    visibility: !existingImage.visibility,
                })
                .where(eq(userImage.id, imageId))
                .returning();
                console.log("Visibilidad actualizada:", updateImage[0].visibility)
                return {
                    success: true,
                    visibility: updateImage[0].visibility
                }
            } catch (error) {
                console.error("Error al crear la imagen:", error);
                throw new Error('Error al crear la imagen');
            }
        }
    })
}