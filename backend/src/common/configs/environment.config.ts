import dotenv from 'dotenv';
import z from 'zod';
dotenv.config();

const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().default('localhost'),
  DB_URI: z.url({ message: 'DB_URI must be a valid URL' }),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  // Pretty-print all issues and stop boot
  const issues = parsed.error.issues
    .map(i => ` ${i.path.join('.')}: ${i.message}`)
    .join('\n');
  throw new Error(`Invalid environment configuration:\n${issues}`);
}

export const ENV = Object.freeze({
  PORT: parsed.data.PORT,
  HOST: parsed.data.HOST,
  DB_URI: parsed.data.DB_URI,
  JWT_SECRET: parsed.data.JWT_SECRET,
});

export type Env = typeof ENV;
