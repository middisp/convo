const getDb = require('../utils/database').getDb;
const { CHANNEL_COLLECTION } = require('../config');

let db;

class Channel {
  constructor(name, user_id) {
    const date = new Date();
    this.name = name;
    this.user_id = user_id;
    this.meta = {
      createdAt: date,
      modifiedAt: date
    }
  }

  save() {
    db = getDb();

    return db.collection(CHANNEL_COLLECTION)
      .insertOne(this)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      });
  }

  static fetchAll(userId) {
    db = getDb();

    return db.collection(CHANNEL_COLLECTION)
      .find({ user_id: user_id })
      .toArray()
      .then(channels => {
        return channels;
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
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