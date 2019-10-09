const getDb = require('../utils/database').getDb;
const { MESSAGE_COLLECTION } = require('../config');

let db;

class Message {
  constructor(content, senderId, channelId) {
    this.content = content;
    this.senderId = senderId;
    this.channelId = channelId;
  }

  save() {
    db = getDb();

    return db.collection(MESSAGE_COLLECTION)
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

    return db.collection(MESSAGE_COLLECTION)
      .find({ channelId: channelId })
      .toArray()
      .then(messages => {
        console.log(messages);
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }

  static updateMessage(messageId, properties = {}) {
    return true
  }

  static deleteMessage(messageId) {
    return true;
  }
}

module.exports = Message;
