import * as express from 'express';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as qs from 'querystring';
import * as cookieParser from 'cookie-parser';
import { Express } from "express";
import { Model, Document } from 'mongoose';

import User from './models/user';

declare let logger: any;

export default class App {

  private app: Express;
  private model: Model<Document>;
  private readonly PORT = 3334;
  private readonly DB = 'mongodb://localhost:27017/test'

  start(): void {
    this.setApp();
    this.setModel();
    this.startApp();
  }

  private setGetUser(): void {

    this.app.get('/user/:username', (req, res) => {
      let username = req.params.username;
      this.model.findOne({ username: username }, (err, user) => {
        if (err) {
          console.error(err);
          return res.end(JSON.stringify({ error: err }));
        }
        if (user) {
          res.end(JSON.stringify(user));
        } else {
          res.end(JSON.stringify('No user'));
        }
      })
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
      });
    });
  }

  private setGetUsers(): void {
    this.app.get('/users', (req, res) => {
      this.model
        .find()
        .sort({ createdAt: 'descending' })
        .exec((err, users) => {
          if (err) {
            console.error(err);
            res.end(JSON.stringify({ error: err }));
            return;
          }
          if (users.length) {
            res.end(JSON.stringify(users));
          } else {
            res.end(JSON.stringify('No users'));
          }
        });
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
      });
    });
  }

  private setPost(): void {
    this.app.options('*', (req: express.Request, res: express.Response, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Content-Type', 'application/json');
      next();
    });

    this.app.post('/register', (req: express.Request, res: express.Response) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Request-Headers', 'Content-Type');
      res.setHeader('Content-Type', 'application/json');

      let data = JSON.parse(req.body.data);
      let username = data.username;
      let password = data.password;

      this.model.findOne({ username: username }, (err, user) => {
        if (err) {
          console.error('error');
          return res.status(500).end('Internal Error');
        }
        if (user) {
          return res.status(409).end(JSON.stringify(
            { error: 'User does already exist with that username.' }
          ));
        }
        const newUser = new this.model({
          username: username,
          password: password
        });
        newUser.save((err) => {
          if (err) {
            console.error('error while saving document', err)
            return res.status(500).end('Internal Error');
          }
        });
        res.status(200).end('New account registered');
      })
    });

  }

  private setApp(): void {
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());

    this.setGetUser();
    this.setGetUsers();
    this.setPost();
    // login

  }

  private setModel(): void {
    mongoose.connect(this.DB)
    this.model = new User().getModel();
  }

  private startApp(): void {
    this.app.listen(this.PORT, () =>
      console.log('server started on port ' + this.PORT));
  }
}