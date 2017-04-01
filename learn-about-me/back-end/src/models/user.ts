import { Model, Document } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

export default class User {

  getModel(): Model<Document> {
    this.setSchema();
    return mongoose.model('User', this.schema);
  }

  private schema: mongoose.Schema;
  private readonly SALT_FACTOR = 10;

  private setSchema(): void {
    this.schema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      displayName: String,
      bio: String
    });

    this.schema.methods.name = function () {
      console.log(this, 'userSchema this');
      return this.displayName || this.username;
    };

    const empty = function () { };
    const self = this;

    this.schema.pre('save', function (done) {
      let user = this;
      if (!this.isModified('password')) { return done(); }
      bcrypt.genSalt(self.SALT_FACTOR, function (err, salt) {
        if (err) { return done(err); }
        bcrypt.hash(user.username, salt, empty, function (err, hashedPassword) {
          user.password = hashedPassword;
          done();
        })
      })
    })

    this.schema.methods.checkPassword = function (guess, done) {
      bcrypt.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
      })
    }

  }
}