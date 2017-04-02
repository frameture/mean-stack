import * as bcrypt from 'bcrypt-nodejs';
import * as mongoose from 'mongoose';
import { Document, Model } from 'mongoose';

export default class User {

  private schema: mongoose.Schema;
  private readonly SALT_FACTOR = 10;

  getModel(): Model<Document> {
    this.setProperties();
    this.setMethods();

    return mongoose.model('User', this.schema);
  }


  private setProperties(): void {
    this.schema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      displayName: String,
      bio: String
    });
  }

  private setMethods(): void {
    const self = this;

    this.schema.methods.name = function () {
      return this.displayName || this.username;
    };


    this.schema.pre('save', function (done) {
      const empty = function () { };
      const user = this;

      if (!this.isModified('password')) { return done(); }
      bcrypt.genSalt(self.SALT_FACTOR, function (err, salt) {
        if (err) { return done(err); }
        bcrypt.hash(user.password, salt, empty, function (err, hashedPassword) {
          user.password = hashedPassword;
          done();
        });
      });
    });

    this.schema.methods.checkPassword = function (guess, done) {
      bcrypt.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
      });
    };
  }

}
