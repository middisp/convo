const ObjectId = require('mongodb').ObjectId;
const getDb = require('../utils/database').getDb;
const { USER_COLLECTION } = require('../config');
const { response } = require('express');

let db;

class User {
  constructor(firstName, lastName, email, password) {
    const date = new Date();
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayName = '';
    this.email = email;
    this.avatar = ''; // Blob storage URL, use id as file name.
    this.qr = ''; // Need to generate this.
    this.password = password;
    this.preferences = {};
    this.threads = [];
    this.mates = [];
    this.meta = {
      createdAt: date,
      modifiedAt: date,
    }
  }

  save() {
    db = getDb();

    return db.collection(USER_COLLECTION)
      .insertOne(this)
      .then(result => {
        return result.ops[0];
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      });
  }

  static getUser(id) {
    const o_id = new ObjectId(id);
    db = getDb();

    return db.collection(USER_COLLECTION)
      .findOne({ _id: o_id })
      .then(result => result)
      .catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      });
  }

  static getUserByEmail(email) {
    db = getDb();

    return db.collection(USER_COLLECTION)
      .findOne({ email })
      .then(result => result)
      .catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      });
  }

  static fetchAll(channel_id) {
    db = getDb();

    return db.collection(USER_COLLECTION)
      .find({ channel_id: channel_id })
      .toArray()
      .then(result => result)
      .catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      });
  }

  static updateUser(id, user) {
    const o_id = new ObjectId(id);
    const date = new Date();
    db = getDb();

    delete user._id;

    user.meta.modifiedAt = date;

    return db.collection(USER_COLLECTION)
      .findOneAndUpdate({ _id: o_id }, { $set: user }, { returnOriginal: false })
      .then(result => {
        const user = result.value;
        delete user.password;
        return user;
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      })
  }

  static deleteUser(id) {
    return true;
  }

}

module.exports = User;
