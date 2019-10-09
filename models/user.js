const getDb = require('../utils/database').getDb;
const { USER_COLLECTION } = require('../config');

let db;

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  save() {
    db = getDb();

    return db.collection(USER_COLLECTION)
      .insertOne(this)
      .then(result => {
        console.log(result);
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }

  static fetchAll(channelId) {
    db = getDb();

    return db.collection(USER_COLLECTION)
      .find({ channelId: channelId })
      .toArray()
      .then(messages => {
        console.log(messages);
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }

  static updateUser(userId, properties = {}) {
    return true;
  }

  static deleteUser(userId) {
    return true;
  }

}

module.exports = User;
