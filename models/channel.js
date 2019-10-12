const getDb = require('../utils/database').getDb;
const { CHANNEL_COLLECTION } = require('../config');

let db;

class Channel {
  constructor(name, user_id) {
    this.name = name;
    this.user_id = user_id;
  }

  save() {
    db = getDb();

    return db.collection(CHANNEL_COLLECTION)
      .insertOne(this)
      .then(result => {
        return result;
      })
      .then(result => {

      })
      .catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }

  static fetchAll(userId) {
    db = getDb();

    return db.collection(CHANNEL_COLLECTION)
      .find({ user_id: user_id })
      .toArray()
      .then(messages => {
        return messages;
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }

  static updateChannel(channel_id, propeties = {}) {
    return true;
  }

  static deleteChannel(channel_id) {
    return true;
  }
}

module.exports = Channel;