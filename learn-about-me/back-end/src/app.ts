import * as express from 'express';
import * as logger from 'morgan';
import { Express } from 'express';

declare const logger: any;

export default class App {

  private app = express();
  private readonly PORT = 3333;

  start(): void {
    this.setApp();
    this.startApp();
  }

  private setApp(): void {
    this.app.use(logger('dev'));
    this.app.use((req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Headers": "Content-Type",
        "Content-Type": "text/html"
      });
      res.end('<h1>1 some response</h1>');
    });
  }

  private startApp(): void {
    this.app.listen(this.PORT, () =>
      console.log('server started on port ' + this.PORT));
  }
}