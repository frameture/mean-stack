import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';

import User from './models/user';
import Routes from './routes';

export default class App {

  private app: express.Express;
  private router: express.Router;
  private readonly PORT = 3001;
  private readonly DB = 'mongodb://localhost:27017/test';

  constructor() {
    this.app = express();
    this.router = new Routes().getRouter();
  }

  start(): void {
    this.app.use(cors());
    this.app.use(logger('dev'));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(this.router);

    mongoose.connect(this.DB);

    this.app.listen(this.PORT, () =>
      console.log('server started on port ' + this.PORT));
  }

}
