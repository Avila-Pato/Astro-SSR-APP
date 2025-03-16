// esquema de ejemplo



// import { desc, relations } from "drizzle-orm";
// import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";


// // Definir tablas
// export const user = pgTable("user", {
// 					id: text("id").primaryKey(),
// 					name: text('name').notNull(),
//  email: text('email').notNull().unique(),
//  emailVerified: boolean('email_verified').notNull(),
//  image: text('image'),
//  createdAt: timestamp('created_at').notNull(),
//  updatedAt: timestamp('updated_at').notNull()
// 				});

// // Tabla de session
// export const session = pgTable("session", {
// 					id: text("id").primaryKey(),
// 					expiresAt: timestamp('expires_at').notNull(),
//  token: text('token').notNull().unique(),
//  createdAt: timestamp('created_at').notNull(),
//  updatedAt: timestamp('updated_at').notNull(),
//  ipAddress: text('ip_address'),
//  userAgent: text('user_agent'),
//  userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
// 				});

// // Tabla de account
// export const account = pgTable("account", {
// 					id: text("id").primaryKey(),
// 					accountId: text('account_id').notNull(),
//  providerId: text('provider_id').notNull(),
//  userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
//  accessToken: text('access_token'),
//  refreshToken: text('refresh_token'),
//  idToken: text('id_token'),
//  accessTokenExpiresAt: timestamp('access_token_expires_at'),
//  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
//  scope: text('scope'),
//  password: text('password'),
//  createdAt: timestamp('created_at').notNull(),
//  updatedAt: timestamp('updated_at').notNull()
// 				});

// // Tabla de verification 
// export const verification = pgTable("verification", {
// 					id: text("id").primaryKey(),
// 					identifier: text('identifier').notNull(),
//  value: text('value').notNull(),
//  expiresAt: timestamp('expires_at').notNull(),
//  createdAt: timestamp('created_at'),
//  updatedAt: timestamp('updated_at')
// 				});

// //Tabla para las userImage (Imagenes del usuaario)
// export const userImage = pgTable("user_image", {
// id: text("id").primaryKey(),
// userId: text('user_id')
// .notNull()
// .references(()=> user.id, { onDelete: 'cascade' }),
// url: text('url').notNull(),
// format: text('format').default('jpg'),
// descriptions: text('descriptions'),
// visibility: boolean('visibility').default(false).notNull(),
// createdAt: timestamp('created_at').defaultNow(),
// updatedAt: timestamp('updated_at').defaultNow()
// })

// //Tabla imageLike (Likes a imagenes)
// export const imageLike = pgTable("image_like", {
// 	id: text("id").primaryKey(),
// 	userId: text('user_id')
// 	.notNull()
// 	.references(()=> user.id, { onDelete: 'cascade' }),
// 	imageId: text('image_id')
// 	.notNull()
// 	.references(()=> userImage.id, { onDelete: 'cascade' }),
// 	createdAt: timestamp('created_at').defaultNow(),
// });

// //Tabla de comment (comentarios en las imagenes)
// export const comment = pgTable("comment", {
// 	id: text("id").primaryKey(),
// 	userId: text('user_id')
// 	.notNull()
// 	.references(()=> user.id, { onDelete: 'cascade' }),
// 	imageId: text('image_id')
// 	.notNull()
// 	.references(()=> userImage.id, { onDelete: 'cascade' }),
// 	content: text('content').notNull(),
// 	createdAt: timestamp('created_at').defaultNow(),
// });

// // Definiendo relaciones
// // Relacion user con imagnes comentarios y likes
// export const userRelations = relations(user, ({ many }) => ({
// 	images: many(userImage),
// 	comments: many(comment),
// 	likes: many(imageLike),
// }))

// // Relacion userImage con likes y comentarios
// export const userImageRelations = relations(userImage, ({ one,  many }) => ({
// 	user: one(user, {
// 		fields: [userImage.userId],
// 		references: [user.id]
// 	}),
// 	likes: many(imageLike),
// 	comments: many(comment),
// }))

// // Relacion iamgeLike con usuario e imagen
// export const imageLikeRelations = relations(imageLike, ({ one }) => ({
// 	image: one(userImage, {
// 		fields: [imageLike.imageId],
// 		references: [userImage.id]
// 	}),
// 	user: one(user, {
// 		fields: [imageLike.userId],
// 		references: [user.id]
// 	})
// }));

// // Relacion comment con usuario e imagen
// export const commentRelations = relations(comment, ({ one}) => ({
// 	 user: one(user, {
// 		fields: [comment.userId],
// 		references: [user.id]
// 	 }),
// 	 image: one(userImage, {
// 		fields: [comment.imageId],
// 		references: [userImage.id]
// 	 })
// }))
// // Este codigo usa Drizzle ORM para definir las tablas y relaciones de la base de datos.
// // luego ahi que migrar con `npx drizzle-kit migrate` y crear la base de datos con `npx drizzle-kit db:push`
// //  o segun como este configurado en mi caso como npm run generate y npm run push 