import { DB_HOST, DB_PASSWORD, DB_USERNAME } from '@config';

const dbConnection = {
  url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/core-db?authSource=admin&replicaSet=atlas-ubi6k1-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
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
