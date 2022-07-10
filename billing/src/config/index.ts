import { config } from 'dotenv';

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_DATABASE, QUEUE_NAME, AMQP_URL, DB_USERNAME, DB_PASSWORD } = process.env;
