const ObjectId = require('mongodb').ObjectId;

const getDb = require('../utils/database').getDb;
const { MESSAGE_COLLECTION } = require('../config');

let db;

class Message {
  constructor(content, sender_id, thread_id) {
    const date = new Date();
    this.content = content;
    this.sender_id = new ObjectId(sender_id);
    this.thread_id = new ObjectId(thread_id);
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

  static fetchAll(thread_id) {
    const o_id = new ObjectId(thread_id);
    db = getDb();

    return db.collection(MESSAGE_COLLECTION)
      .find({ thread_id: o_id })
      .toArray()
      .then(result => {
        return result;
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      });
  }

  static updateMessage(message_id, message) {
    const o_id = new ObjectId(message_id);
    const date = new Date();
    db = getDb();

    return db.collection(MESSAGE_COLLECTION)
      .updateOne({ _id: o_id }, { $set: { ...message, edited: true, meta: { modifiedAt: date } } })
      .then(result => {
        return result
      }).catch(err => {
        console.log(`Error: ${err}`);
        next(new Error(err));
      })
  }

  static deleteMessage(message_id) {
    return true;
  }
}

module.exports = Message;
