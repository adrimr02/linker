import { z, type ZodTypeAny } from "zod";

export const env = envValidation({
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  VERCEL_URL: z.string().url().optional().default('localhost:3000'),

  DATABASE_URL: z.string().url(),
})



type ZodSchemaRecord<T extends Record<string, ZodTypeAny>> = {
  [K in keyof T]: T[K] extends ZodTypeAny ? T[K] : never;
};

function envValidation<T extends Record<string, ZodTypeAny>>(vars: ZodSchemaRecord<T>) : { [K in keyof T]: T[K]["_output"] } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: { [key: string]: any } = {};
  
  for (const key in vars) {
    const value = vars[key].safeParse(process.env[key]); // Use "safeParse" to get the validated value
    if (value.success) {
      result[key] = value.data;
    } else {
      throw new Error(`Validation failed for key '${key}': ${value.error.message}`);
    }
  }
  
  
  return result as { [K in keyof T]: T[K]["_output"] };
}
