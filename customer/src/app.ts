import path from 'path';
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '/@universal/configs');

import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import errorMiddleware from '@/middlewares/error.middleware';
import notFound from './middlewares/not-found.middleware';
import Routes from '@/interfaces/route.interface';
import dbConnection from '@/databases';
import { connect, set } from 'mongoose';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.env = process.env.NODE_ENV;
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initializeRouteNotFound();
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
    this.app.use(cors());
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(dbConnection.url, dbConnection.options)
      .then(con => {
        console.log('DB Connected');
      })
      .catch(error => {
        console.log(`Database connection failed: ${error}`);
      });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  private initializeRouteNotFound() {
    this.app.use(notFound);
  }
}

export default App;
