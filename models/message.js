const getDb = require('../utils/database').getDb;
const { MESSAGE_COLLECTION } = require('../config');

let db;

class Message {
  constructor(content, sender_id, recipient_id) {
    const date = new Date();
    this.content = content;
    this.sender_id = sender_id;
    this.recipient_id = recipient_id;
    this.edited = false;
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
        return result.ops[0];
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      });
  }

  static fetchAll(sender_id, recipient_id) {
    db = getDb();

    return db.collection(MESSAGE_COLLECTION)
      .find({ sender_id, recipient_id })
      .toArray()
      .then(result => {
        return result;
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
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
