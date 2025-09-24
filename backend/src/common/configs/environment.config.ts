import dotenv from "dotenv";
import z from "zod";
dotenv.config();

const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().default("localhost"),
  DB_URI: z.url({ message: "DB_URI must be a valid URL" }),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  UPLOAD_DIR: z.string().default("uploads"),
  MAX_FILE_SIZE: z.coerce
    .number()
    .int()
    .positive()
    .default(5 * 1024 * 1024), // 5 MB
  MAX_FILE_COUNT: z.coerce.number().int().positive().default(5),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  // Pretty-print all issues and stop boot
  const issues = parsed.error.issues
    .map(i => ` ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(`Invalid environment configuration:\n${issues}`);
}

export const ENV = Object.freeze({
  PORT: parsed.data.PORT,
  HOST: parsed.data.HOST,
  DB_URI: parsed.data.DB_URI,
  JWT_SECRET: parsed.data.JWT_SECRET,
  UPLOAD_DIR: parsed.data.UPLOAD_DIR,
  MAX_FILE_SIZE: parsed.data.MAX_FILE_SIZE,
  MAX_FILE_COUNT: parsed.data.MAX_FILE_COUNT,
});

export type Env = typeof ENV;
