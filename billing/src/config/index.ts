import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_DATABASE, QUEUE_NAME, AMQP_URL, DB_USERNAME, DB_PASSWORD } = process.env;
