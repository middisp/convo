const getDB = require('../utils/database').getDB;

const COLLECTION = 'messages';

class Message {
  constructor(content, senderId, recipiantId) {
    this.content = content;
    this.senderId = senderId;
    this.recipiantId = this.recipiantId;
  }

  save() {
    const db = getDB();

    return db.collection(COLLECTION)
      .insertOne(this)
      .then(result => {
        console.log(result);
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }

  static fetchAll(senderId) {
    const db = getDB();

    return db.collection(COLLECTION)
      .find({ senderId: senderId })
      .toArray()
      .then(messages => {
        console.log(messages);
      }).catch(err => {
        console.log(`Error: ${err}`);
        throw err;
      });
  }
}

module.exports = Message;
