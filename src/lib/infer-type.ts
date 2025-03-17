import type { BuildQueryResult, DBQueryConfig, ExtractTablesWithRelations } from "drizzle-orm"
import * as schema from "../db/schema";



// Este código define tipos en TypeScript para manejar consultas tipadas con Drizzle ORM. Permite: ✅ Inferir el tipo de una consulta según la tabla y relaciones.
// ✅ Definir relaciones que se pueden incluir (IncludeRelation).
// ✅ Usar InferResultType para obtener resultados con datos anidados.

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
    "one" | "many",
    boolean,
    TSchema,
    TSchema[TableName]
>["with"]


export type InferResultType<
    TableName extends keyof TSchema,
    With extends IncludeRelation<TableName> | undefined = undefined,
> = BuildQueryResult<
    TSchema,
    TSchema[TableName], {
    with: With
}>  



export type TImagePost = InferResultType<
"userImage",
{ user: true; likes: true; comments: true }
>