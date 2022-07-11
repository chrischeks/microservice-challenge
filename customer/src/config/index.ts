import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_DATABASE, BILLING_BASE_URL, DB_PASSWORD, DB_USERNAME } = process.env;
