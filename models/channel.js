const getDb = require('../utils/database').getDb;
const { CHANNEL_COLLECTION } = require('../config');

let db;

class Channel {
  constructor(name, userId) {
    this.name = name;
    this.userId = userId;
  }

  save() {
    db = getDb();

    return db.collection(CHANNEL_COLLECTION)
      .insertOne(this)
      .then(result => {
        console.log(result);
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }

  static fetchAll(userId) {
    db = getDb();

    return db.collection(CHANNEL_COLLECTION)
      .find({ userId: userId })
      .toArray()
      .then(messages => {
        console.log(messages);
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }

  static updateChannel(channelId, propeties = {}) {
    return true;
  }

  static deleteChannel(channelId) {
    return true;
  }
}

module.exports = Channel;