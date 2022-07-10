import { DB_HOST, DB_PORT, DB_DATABASE } from '@config';

const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export default dbConnection;
