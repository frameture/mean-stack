import * as express from 'express';
import * as jwt from 'express-jwt';
import { Document, Model } from 'mongoose';
import * as passport from 'passport';
import { Strategy } from 'passport-local';

import User from './models/user';

export default class Routes {

  private authCheck: jwt.RequestHandler;
  private user: Model<Document>;
  private router: express.Router;

  constructor() {
    this.authCheck = jwt({
      secret: new Buffer('9k5MqFPD6XM2LRjoYACIjvIWkgr5LYBoNjzWdBG7AhD5dfCvr7zqoL3IDneH-oZT', 'base64'),
      audience: 'DAjXyietLOcv9SEaV23wx4ejrix9E3UB'
    });
    this.user = new User().getModel();
    this.router = express.Router();
  }

  getRouter(): express.Router {
    this.setRoutes();
    return this.router;
  }

  private setRoutes(): void {
    this.routeLogin();
    this.routeUpdate();
    this.routeUser();
    this.routeUsers();
    this.routeRegister();
  }

  private routeUser(): void {
    this.router.get('/user/:username', (req, res) => {
      const username = req.params.username;
      this.user.findOne({ username }, (err, user) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (user) {
          res.json(user);
        } else {
          res.json('No user');
        }
      });
    });
  }

  private routeUsers(): void {
    this.router.get('/users', (req, res) => {
      this.user
        .find()
        .sort({ createdAt: 'descending' })
        .exec((err, users) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
          if (users.length) {
            res.json(users);
          } else {
            res.json('No users');
          }
        });
    });
  }

  private routeLogin(): void {
    this.router.post('/login', (req, res) => {
      const user = JSON.parse(req.body.data);
      this.user.findOne({ username: user.username }, (err, foundUser: any) => {
        if (err) {
          console.error(err);
          return res.status(500).end('Internal Server Error');
        }
        if (!foundUser) {
          return res.json({ success: false, message: 'Wrong username.' });
        }

        foundUser.checkPassword(user.password, (err, isMatch) => {
          if (err) {
            console.error(err);
            return res.status(500).end('Internal Server Error');
          }
          if (!isMatch) {
            res.json({ success: false, message: 'Wrong password.' });
          } else {
            const auth_token = 'some-random-token';
            res.json({ success: true, user: foundUser, auth_token });
          }
        });
      });
    });
  }

  private routeUpdate(): void {
    this.router.put('/update', (req, res) => {
      const data = JSON.parse(req.body.data);
      const username = data.username;
      const bio = data.bio;
      const displayName = data.displayName;

      console.log(bio, displayName);
      this.user.findOne({ username }, (err, user: any) => {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }
        if (!user) { return res.json({ success: false, message: 'No such user' }); }

        user.bio = bio;
        user.displayName = displayName;
        user.save();
        res.json(user);
      });
    });
  }

  private routeRegister(): void {
    this.router.post('/register', (req: express.Request, res: express.Response) => {
      const data = JSON.parse(req.body.data);
      const username = data.username;
      const password = data.password;

      this.user.findOne({ username }, (err, user) => {
        if (err) {
          console.error('error');
          return res.status(500).end('Internal Server Error');
        }
        if (user) {
          return res.status(409).json(
            { message: 'User does already exist with that username.' },
          );
        }
        const newUser = new this.user({
          username,
          password,
        });
        newUser.save((err) => {
          if (err) {
            console.error('error while saving document', err);
            return res.status(500).end('Internal Server Error');
          }
        });
        res.status(200).send('New account registered');
      });
    });

  }
}
