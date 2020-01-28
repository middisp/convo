const ObjectId = require('mongodb').ObjectId;
const getDb = require('../utils/database').getDb;
const { USER_COLLECTION } = require('../config');

let db;

class User {
  constructor(name, email, password) {
    const date = new Date();
    this.name = name;
    this.email = email;
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
      .then(result => {
        return result;
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      });
  }

  static getUserByEmail(email) {
    db = getDb();

    return db.collection(USER_COLLECTION)
      .findOne({ email })
      .then(result => {
        return result;
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      });
  }

  static fetchAll(channel_id) {
    db = getDb();

    return db.collection(USER_COLLECTION)
      .find({ channel_id: channel_id })
      .toArray()
      .then(result => {
        return result.ops;
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      });
  }

  static updateUser(id, user) {
    const o_id = new ObjectId(id);
    const date = new Date();
    db = getDb();

    console.log('user', user);

    user.meta.modifiedAt = date;
    delete user._id;

    return db.collection(USER_COLLECTION)
      .updateOne({ _id: o_id }, { $set: user })
      .then(result => {
        return result
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      })
  }

  static deleteUser(id) {
    return true;
  }

}

module.exports = User;
