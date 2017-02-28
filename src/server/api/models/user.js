import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import mongoose, { Schema } from 'mongoose';
import faker from 'faker';

const UserSchema = new Schema({
  email: String,
  password: String,
  name: String,
  dob: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  bio: String,
  username: String, // TODO: unique
});

UserSchema.pre('save', function save(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {

    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model('user', UserSchema);
// generate sample data
User.remove().then(() => {
  const users = [];
  for (let i = 0; i < 100; i++) {
    const userData = faker.helpers.contextualCard();

    users.push(new User({
      username: userData.email,
      name: userData.name,
      email: userData.email,
      dob: new Date(userData.dob),
      createdAt: new Date() - (i * 100),
    }));
  }

  users.push(new User({
    name: 'Adrian Perez',
    email: 'adrianperez.deb@gmail.com',
    password: 'elite/2016',
    username: 'blackxored',
    dob: new Date('1989-10-02'),
  }));

  User.create(users);
});

export default User;
