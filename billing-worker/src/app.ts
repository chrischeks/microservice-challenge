import path from 'path';
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '/@universal/configs');

import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import createMQConsumer from '@/consumers';
import { QUEUE_NAME } from './config';
import errorMiddleware from './middlewares/error.middleware';
import dbConnection from '@/databases';
import { connect, set } from 'mongoose';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public consumer = createMQConsumer(process.env.AMQP_URL, QUEUE_NAME);

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.env = process.env.NODE_ENV;
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeErrorHandling();
  }

  public getServer() {
    return this.app;
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port} - ENV: ${this.env}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.consumer();
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(dbConnection.url, dbConnection.options)
      .then(() => {
        console.log('DB Connected');
      })
      .catch(error => {
        console.log(`Database connection failed: ${error}`);
      });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
