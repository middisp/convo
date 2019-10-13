const getDb = require('../utils/database').getDb;
const { MESSAGE_COLLECTION } = require('../config');

let db;

class Message {
  constructor(content, user_id, channel_id) {
    const date = new Date();
    this.content = content;
    this.user_id = user_id;
    this.channel_id = channel_id;
    this.meta = {
      createdAt: date,
      modifiedAt: date
    }
  }

  save() {
    db = getDb();

    return db.collection(MESSAGE_COLLECTION)
      .insertOne(this)
      .then(result => {
        return result;
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }

  static fetchAll(channel_id) {
    db = getDb();

    return db.collection(MESSAGE_COLLECTION)
      .find({ channel_id: channel_id })
      .toArray()
      .then(messages => {
        return messages;
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }

  static updateMessage(message_id, properties = {}) {
    return true
  }

  static deleteMessage(message_id) {
    return true;
  }
}

module.exports = Message;
