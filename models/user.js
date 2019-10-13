const ObjectId = require('mongodb').ObjectId;
const getDb = require('../utils/database').getDb;
const { USER_COLLECTION } = require('../config');

let db;

const findOperation = (properties) => {
  const date = new Date();
  if (properties.channel_id) {
    return {
      $push: { channels: properties._id },
      $set: { 'meta.modifiedAt': date }
    }
  }

  return ({
    $set: { ...properties, 'meta.ModifiedAt': date }
  })
}

class User {
  constructor(name, email, password) {
    const date = new Date();
    this.name = name;
    this.email = email;
    this.password = password;
    this.channels = [];
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
        return result;
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }

  static getUser(id) {
    const o_id = new ObjectId(id);
    db = getDb();

    return db.collection(USER_COLLECTION)
      .findOne({ _id: o_id })
      .then(user => {
        return user;
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }

  static fetchAll(channel_id) {
    db = getDb();

    return db.collection(USER_COLLECTION)
      .find({ channel_id: channel_id })
      .toArray()
      .then(users => {
        return users;
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }

  static updateUser(id, properties = {}) {
    const o_id = new ObjectId(id);
    db = getDb();

    const operation = findOperation(properties);

    return db.collection(USER_COLLECTION)
      .updateOne({ _id: o_id }, operation)
      .then(user => {
        return user
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      })
  }

  static deleteUser(id) {
    return true;
  }

}

module.exports = User;
