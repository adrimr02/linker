import { drizzle } from "drizzle-orm/planetscale-serverless"
import { connect } from "@planetscale/database"
import * as schema from "./schema"
import { env } from "@/lib/env"
 
const connection = connect({
  url: env.DATABASE_URL,
})
 
export const db = drizzle(connection, { schema })
export type DbClient = typeof db